# Generated by Django 4.2 on 2023-04-30 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finder', '0003_remove_useraccount_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='username',
            field=models.CharField(default='volpe', max_length=255, unique=True),
            preserve_default=False,
        ),
    ]