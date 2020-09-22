release:
	ionic capacitor add android 
	ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..

git:
	git add .
	git commit -m "$m"
	git push