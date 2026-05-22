from django.contrib import admin
from .models import Product, Order, Message, StoreSettings, HeroBanner


admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Message)
admin.site.register(StoreSettings)


@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_active', 'created_at')
    list_filter = ('is_active',)
    list_editable = ('is_active',)
