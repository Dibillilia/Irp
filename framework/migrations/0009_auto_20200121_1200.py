# Generated by Django 3.0.2 on 2020-01-21 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('framework', '0008_auto_20200121_1200'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lesson',
            old_name='editor_html',
            new_name='html',
        ),
    ]
