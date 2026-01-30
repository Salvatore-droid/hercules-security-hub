from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.views.decorators.http import require_POST
import json
import uuid
from datetime import datetime, timedelta
from .models import User, UserSession

@csrf_exempt
@require_POST
def signup(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        name = data.get('name', '').strip()
        
        # Validation
        if not email or not password or not name:
            return JsonResponse({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({
                'success': False,
                'message': 'Email already registered'
            }, status=400)
        
        if len(password) < 8:
            return JsonResponse({
                'success': False,
                'message': 'Password must be at least 8 characters'
            }, status=400)
        
        # Create user
        user = User.objects.create(
            username=email,
            email=email,
            first_name=name,
            is_active=True
        )
        user.set_password(password)
        user.save()
        
        # Generate session token
        token = str(uuid.uuid4())
        UserSession.objects.create(
            user=user,
            token=token,
            expires_at=datetime.now() + timedelta(days=7)
        )
        
        return JsonResponse({
            'success': True,
            'message': 'Account created successfully',
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.first_name
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)

@csrf_exempt
@require_POST
def login(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        # Validation
        if not email or not password:
            return JsonResponse({
                'success': False,
                'message': 'Email and password are required'
            }, status=400)
        
        # Find user
        try:
            user = User.objects.get(email=email, is_active=True)
        except User.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Invalid credentials'
            }, status=401)
        
        # Check password
        if not check_password(password, user.password):
            return JsonResponse({
                'success': False,
                'message': 'Invalid credentials'
            }, status=401)
        
        # Generate or update session token
        token = str(uuid.uuid4())
        UserSession.objects.filter(user=user, is_active=True).update(is_active=False)
        
        UserSession.objects.create(
            user=user,
            token=token,
            expires_at=datetime.now() + timedelta(days=7)
        )
        
        return JsonResponse({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.first_name
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)

@csrf_exempt
def logout(request):
    try:
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            UserSession.objects.filter(token=token).update(is_active=False)
        
        return JsonResponse({
            'success': True,
            'message': 'Logged out successfully'
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)

def check_auth(request):
    try:
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'authenticated': False}, status=401)
        
        token = auth_header.split(' ')[1]
        session = UserSession.objects.filter(
            token=token,
            is_active=True,
            expires_at__gt=datetime.now()
        ).first()
        
        if not session:
            return JsonResponse({'authenticated': False}, status=401)
        
        user = session.user
        return JsonResponse({
            'authenticated': True,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.first_name
            }
        })
    except Exception:
        return JsonResponse({'authenticated': False}, status=401)


# Add these imports at the top
from django.utils import timezone
from datetime import timedelta
import random

# Add these views to your existing views.py

@csrf_exempt
def user_stats(request):
    """Get user statistics"""
    try:
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        
        token = auth_header.split(' ')[1]
        session = UserSession.objects.filter(
            token=token,
            is_active=True,
            expires_at__gt=timezone.now()
        ).first()
        
        if not session:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        
        user = session.user
        
        # In a real app, you'd calculate these from your database
        # For now, return mock data
        return JsonResponse({
            'total_scans': random.randint(30, 100),
            'vulnerabilities_found': random.randint(100, 500),
            'bounties_earned': random.randint(5000, 50000),
            'reports_submitted': random.randint(20, 100)
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def recent_scans(request):
    """Get recent scans for the user"""
    try:
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        
        token = auth_header.split(' ')[1]
        session = UserSession.objects.filter(
            token=token,
            is_active=True,
            expires_at__gt=timezone.now()
        ).first()
        
        if not session:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        
        user = session.user
        
        # Mock scan data - in real app, fetch from your Scan model
        targets = ['app.example.com', 'api.startup.io', 'dashboard.corp.net', 
                  'mobile.banking.com', 'auth.service.com', 'payment.gateway.com']
        scan_types = ['Deep Scan', 'Quick Scan', 'API Scan', 'Network Scan']
        statuses = ['completed', 'completed', 'completed', 'running', 'failed']
        
        recent_scans = []
        for i in range(5):
            status = random.choice(statuses)
            recent_scans.append({
                'id': i + 1,
                'target': random.choice(targets),
                'type': random.choice(scan_types),
                'status': status,
                'vulnerabilities': random.randint(0, 15) if status == 'completed' else 0,
                'created_at': f"{random.randint(1, 24)} hours ago" if i > 0 else "Running..."
            })
        
        return JsonResponse(recent_scans, safe=False)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)