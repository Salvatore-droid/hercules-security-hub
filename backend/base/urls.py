from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('check-auth/', views.check_auth, name='check_auth'),
    path('user-stats/', views.user_stats, name='user_stats'),
    path('recent-scans/', views.recent_scans, name='recent_scans'),
]