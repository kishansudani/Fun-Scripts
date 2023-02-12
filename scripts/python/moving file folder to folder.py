import os
import shutil
import zipfile

listofdir = os.listdir('E:\\chap1')    	# for listing all the folder value and storing into variable
parent = 'E:\\chap2'					# for storing all the new value


if len(listofdir) != 0:
	for val in listofdir:
		dire = os.path.splitext(val)[0]		# for all the pre name value before any (.zip) file and storing into variable 
		path = os.path.join(perent, dire)	# making new new path and joining all the path 
		os.mkdir(path)						# making new directory
		shutil.move(f'E:\\chap1\\{val}', f'{path}\\{val}')	# moving file into new folder we made

listofparent = os.listdir('E:\\chap2')	# for listing all the folder value and storing into variable

for val in listofparent:
	new_child = os.path.join(parent, val)				
	with zipfile.ZipFile(new_child,'w') as zip_ref:	
		zip_ref.extractall(f'{parent}\\{val}')	# for extracting all the vlaue from child directory into corrent folder
		zip_ref.close()