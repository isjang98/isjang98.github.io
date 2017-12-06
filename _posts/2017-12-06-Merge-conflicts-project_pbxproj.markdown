---
layout: post
title:  "Merge conflicts project.pbxproj"
date:   2017-12-06 22:35:18 +0900
categories: jekyll update
---

Merge conflicts project.pbxproj
===============================
project.pbxproj 파일은 Xcode 구성 Bundle을 가지고 있는 중요한 파일이다. Project에 Link된 파일과 Framework, Build Setting 등을 유지하도록 하므로 .gitignore 에 추가 할 수 없는 파일이다.

혼자서 개발하는것이 아닌 여러팀원들과 로직이나 기능별로 나눠서 작업을 할때 리소스 추가나 설정 등을 변경하면은 Conflicts 을 생겨서 이것을 해결하고 Merge하는게 하나의 큰일이다. 

이런 수고를 덜기위해서 .gitattributes 파일을 만들고 project.pbxproj 파일을 Binary 처럼 인식하도록 만들면 이 문제를 해결할 수 있다. 

> $ vi .gitattributes


    *.pbxproj binary merge=union



위에 라인을 추가하여 주면은 된다. 
 




