#
# Regular cron jobs for the kali-defaults package
#
0 4	* * *	root	[ -x /usr/bin/kali-defaults_maintenance ] && /usr/bin/kali-defaults_maintenance
