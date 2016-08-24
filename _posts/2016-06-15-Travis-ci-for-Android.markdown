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


# 단위테스트가 Success 이고 Build가 Success이면은 travis_release로 Merge & Push 하도록 작업하였습니다.



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
	    - ./build.sh

	after_success:
	    # Branch Merge & Push
	    # 아래 예제 스크립트는 test, build가 성공적으로 되었을때 특정브랜치에
	    # merge 후 push하는 예제입니다. 
	    # travis_relese Branch Merge & Push
	    - ./deploy.sh "$TRAVIS_BRANCH"

	sudo: false

> build.sh

	
	#! /bin/sh

	echo "============= ./gradlew cDAT 시작 Unit Test =============";
	./gradlew cDAT
	if [ "$?" -eq "0" ]; then
    	echo "============= ./gradlew build 시작 =============";
    	./gradlew build;
    	if [ "$?" -eq "0" ]; then
        	exit 0;
    	else
        	exit 1;
        	echo "=============  ./gradlew build 실패 =============";
    	fi
	else
    	echo "=============  ./gradlew cDAT 실패 =============";
    	exit 1;
	fi

현재 Build 작업 Branch가 Merge Branch와 같으면 github가 merge & push 를 않하도록 Shell Script처리 	

> deploy.sh
	
	#!/bin/bash

	BRANCH="$1"

	if [ "$BRANCH" != "travis_release" ]; then
	    git remote -v
	    git branch
	    git checkout -b travis_release
	    git merge "$TRAVIS_BRANCH"
	    git branch
	    git push [HTTPS_REPO_URL] [BRANCH_NAME] # 아래 예제 참조  
	   # ex) git push https://socar-inc:$GITHUB_TOKEN@github.com/socar-inc/socar-tablet.git travis_release 
	else
		echo "Noting with github"
		exit 0
	fi
