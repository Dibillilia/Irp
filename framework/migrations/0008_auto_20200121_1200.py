# Generated by Django 3.0.2 on 2020-01-21 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('framework', '0007_auto_20200118_2152'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lesson',
            old_name='html',
            new_name='editor_html',
        ),
    ]