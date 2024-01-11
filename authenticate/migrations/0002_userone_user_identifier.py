# Generated by Django 4.2.6 on 2024-01-08 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticate', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserONe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('email', models.CharField(max_length=250, unique=True)),
                ('password', models.CharField(max_length=250)),
                ('identifier', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='identifier',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
