# Generated by Django 3.0.2 on 2020-01-18 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('framework', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('work_ahead', models.BooleanField(default=False)),
                ('security', models.BooleanField(default=False)),
                ('lesson_rep', models.TextField(default='', verbose_name='json representation of lesson')),
                ('active', models.BooleanField(default=False, verbose_name='is there currently an associated session')),
                ('current_slide', models.IntegerField(default=-1, verbose_name='what slide is the current session up to')),
            ],
        ),
    ]
