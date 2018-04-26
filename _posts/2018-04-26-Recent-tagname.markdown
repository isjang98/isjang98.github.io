---
layout: post
title:  "[git] 가장 최근에 반영한 Tag Name 가져오기"
date:  2018-04-26 01:05:18 +0900
categories: jekyll update
---
#가장 최근의 TAG NAME을 가져오기 


프로젝트를 진행을 하면  *branch* 별로 Version을 나누거나 *git tag* 로 버젼을 나눠서 프로젝트를 
관련하는 경우가 많습니다. 

각각의 장단점이 있어서 나의 같은 경우는 둘다 혼용해서 사용해서 **배포버젼** 과 **개발버젼** 을 나눠서 
**Hot-fix** 와 기능 추가 등을 대응 할 때가 많습니다. 

	$ git tag [테그명]
 	   ...
	$ git tag 
	v1.0.1
	v1.0.2
	v1.0.3
	
일반적으로 위의 예제 같이 사용하고 출력이 되는데 가장 최근의 tag name 를 알고 싶어서 고민하던 중 좋은 방법이 있어서 공유 하고자 합니다. 

	$ git for-each-ref \
		refs/tags \
		--sort=-taggerdate \
		--format='%(refname:short)' \
		--count=1
		    
위에 명령어로 사용하면은 가장 최근에 반영한 테그명을 알 수 있고,  나의 경우는 가장 최근에 반영한 테그명을 가져와서 
Github release 에 반영을 하는데 위에 명령어를 가지고 유용하게 사용하고 있습니다.  



 
