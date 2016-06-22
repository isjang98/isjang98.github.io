---
layout: post
title:  "Travis CI for Android"
date:   2016-06-15 01:05:18 +0900
categories: jekyll update
---

# Travis CI

> Docs : <a href="https://docs.travis-ci.com/">https://docs.travis-ci.com/</a>

## Socar-tablet
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
	  	# The BuildTools version used by your project
	    - build-tools-23.0.1	  
	    
	    # The SDK version used to compile your project
	    - android-23	
	    - add-on	
	    
    	# Additional components
    	- extra
		- extra-android-m2repository
		- extra-google-google_play_services
		- extra-google-m2repository
		- extra-android-m2repository

	before_install:
	  - export JAVA7_HOME=/usr/lib/jvm/java-7-oracle
	  - export JAVA8_HOME=/usr/lib/jvm/java-8-oracle
	  - export JAVA_HOME=$JAVA8_HOME
	  # NDK 관련 Install & 환경변수 설정
	  - git clone https://github.com/urho3d/android-ndk.git $HOME/android-ndk-root
  	  - export ANDROID_NDK_HOME=$HOME/android-ndk-root
	  - echo "ndk.dir=$ANDROID_NDK_HOME" > local.properties	
	
	
	# 빌드에 사용할 스크립트입니다.
	script: ./gradlew build

	deploy:
	  provider: releases	
	  api_key: [GITHUB API KEY]
	  file: app/build/outputs/apk/app-release.apk
	  skip_cleanup: true
	  
	  on:	  
	    tags: true	  
	    repo: socar-inc/socar-tablet	    
	env:
	  global:
	    - NDK_VERSION=r11c
	sudo: false


