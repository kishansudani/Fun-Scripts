import time
import subprocess
import os.path
import os


def main():
	# give the path of folder
	for File in os.listdir(""):
	    if File.endswith(".py"):
			# give the path of source to destination
	      	subprocess.call(['move','*.py',''], shell=True)


# process is running till you close it.
# if you want to move file while downloading another then dont close the window
if __name__ == '__main__':
	while True:
		main()
		time.sleep(5)