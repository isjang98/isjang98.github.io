---
layout: post
title:  "[git] 이미 올렸던 파일 gitignore 하기"
date:  2016-07-16 01:05:18 +0900 
categories: jekyll update
---
# [git] 이미 올렸던 파일 gitignore 하기


이미  git add 하고 올렸던 파일은 캐쉬에 남아서 gitignore에 추가해도 
사라지지 않는 경우가 발생한다. 

##### 아래 같은 명령어로 캐쉬를 삭제해주면 해결 되어진다. 


	git rm --cached [file name] 
	

# refer

<a href="https://stackoverflow.com/questions/4308610/how-to-ignore-certain-files-in-git">https://stackoverflow.com/questions/4308610/how-to-ignore-certain-files-in-git</a>
