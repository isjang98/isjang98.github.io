---
layout: post
title:  "Travis CI for Android"
date:   2016-06-15 01:05:18 +0900
categories: jekyll update
---

# Travis CI
> URL : https://travis-ci.com/<em>[REPOSITORY NAME]<em>

> Docs : <a href="https://docs.travis-ci.com/">https://docs.travis-ci.com/</a>

1. [branch] coding & coding ...
2. git tag 태그명
3. git push github tag명
4. Travis 자동으로 빌드
5. Build Success > APK release > Github release에서 apk & code 생성 (APK 파일 버전별로 관리 가능)


## Android Project Build 위한 .travis.yml 작성
> Travis WebLint : <a href="http://lint.travis-ci.org">http://lint.travis-ci.org/</a>
	
	# 어떤 언어를 사용할 지 정의 합니다.
	language: android
	
	android:
	  components:
	    - build-tools-23.0.1
	    - android-23
	    - android-22
	    - add-on
	    - extra
	    - extra-android-m2repository
	    - extra-google-google_play_services
	    - extra-google-m2repository
	    - extra-android-m2repository
	    - sys-img-armeabi-v7a-android-22
	before_install:
	  - export JAVA7_HOME=/usr/lib/jvm/java-7-oracle
	  - export JAVA8_HOME=/usr/lib/jvm/java-8-oracle
	  - export JAVA_HOME=$JAVA8_HOME
	
	  # NDK 관련 Install & 환경변수 설정
	  - git clone https://github.com/urho3d/android-ndk.git $HOME/android-ndk-root
	  - export ANDROID_NDK_HOME=$HOME/android-ndk-root
	  - echo "ndk.dir=$ANDROID_NDK_HOME" > local.properties
	
	
	before_script:
	  # UI Test를 위해서 Launch Eumlator
	  - echo no | android create avd --force -n test -t $ANDROID_TARGET --abi $ANDROID_ABI
	  - emulator -avd test -no-skin -no-audio -no-window -gpu off &
	  - android-wait-for-emulator
	  - adb shell input keyevent 82 &
	
	
	deploy:
	  api_key: $GITHUB_TOKEN
	  file: app/build/outputs/apk/app-release.apk
	  provider: releases
	  skip_cleanup: true
	
	  on:
	    repo: [REPOSITORY NAME] 
	    tags: true
	env:
	  global:
	    - NDK_VERSION=r11c
	  matrix:
	    - ANDROID_TARGET=android-22 ANDROID_ABI=armeabi-v7a GITHUB_TOKEN=[GITHUB API KEY]
	
	# 빌드에 사용할 스크립트입니다.
	script:
	  # Unit Test
	  - ./gradlew cDAT
	  # Build
	  - ./gradlew build
	
	after_success:
	    # Branch Merge & Push
	    # 아래 예제 스크립트는 test, build가 성공적으로 되었을때 특정브랜치에
	    # merge 후 push하는 예제입니다. 
	   - git remote -v
	   - git branch
	   - git checkout -b [BRANCH_NAME]
	   - git merge "$TRAVIS_BRANCH"
	   - git branch
	   - git push [HTTPS_REPO_URL] [BRANCH_NAME] # 아래 예제 참조 

	   # ex) git push https://socar-inc:$GITHUB_TOKEN@github.com/socar-inc/socar-tablet.git travis_release 
	
	sudo: false


