---
layout: post
title:  "Firebase Realtime DB 이용 하기"
date:   2016-12-28 13:05:18 +0900
categories: jekyll update
---
# Firebase Realtime Database를 이용한 앱 버젼관리 (Android)


많은 개발자들이 REST API등을 사용하여서 앱버젼 관리등을 사용하고 있을것입니다. 
저는 별로의 REST API를 사용하지 않고 Firebase Realtime Database를 이용한 앱 버젼관리를 소개하고자 합니다. 


 > Firebase 실시간 데이터베이스는 클라우드 호스팅 데이터베이스입니다. 데이터는 JSON으로 저장되며 연결된 모든 클라이언트에 실시간으로 동기화됩니다.

가장 먼저 <https://firebase.google.com/> Fireabe 사이트에 접속 & 로그인 하셔서 새 프로젝트를 만듭니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db1.png)


프로젝트 이름을 작성하시고, 국가는 선택하시면 됩니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db2.png)

저는 안드로이드 기준으로 작성할것이기에 Android 앱에 Firebase 추가를 하도록 하겠습니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db3.png)

다음 단계로 Package Name을 입력하고, '앱 추가'를 하시면

![Alt text](https://isjang98.github.io/assets/img/firebase_db4.png)


아래 화면과 같이 'google-service.json'을 다운로드 받을 수 있습니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db5.png)

‘google-service.json’은 위에 그림과 같이 Android Studio에서 프로젝트로 보기로 전화하여서 프로젝트 루트 디렉토리로 표시하여서 Android 앱 모듈 루트 디렉토리로 이동하시면 됩니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db6.png)

위의 그림과 같이 build.gradle(<project>/build.gradle) : 에 

	classpath 'com.google.gms:google-services:3.0.0'

추가하시고 

	dependencies {
	  compile fileTree(dir: 'libs', include: ['*.jar'])
	  androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
	    exclude group: 'com.android.support', module: 'support-annotations'
	  })
	  compile 'com.android.support:appcompat-v7:25.0.1'
	  testCompile 'junit:junit:4.12'
	
	
	  //ADD Firebase
	  compile 'com.google.firebase:firebase-core:10.0.1'
	  compile 'com.google.firebase:firebase-database:10.0.1'
	}
	
	// ADD THIS AT THE BOTTOM
	apply plugin: 'com.google.gms.google-services'

dependencies 에 아래 2줄 


	compile 'com.google.firebase:firebase-core:10.0.1'
	compile 'com.google.firebase:firebase-database:10.0.1


build.gradle가장 하단에 아래 1줄 추가하여주시면 됩니다. 


	apply plugin: 'com.google.gms.google-services'

이 과정까지 무리없이 마치셨으면은 Android Project설정은 마쳤습니다. 

이제는 Firebase Console의 Database에서 Data를 추가하도록 하겠습니다. 
데이타베이스는 cloud-hosted JSON type이라고 생각할 수 있습니다. 


# SQL 데이타베이스와 다르게 JSON Data를 구성하도록 하겠습니다. 
저는 아래와 같이 JSON Data를 구성하도록 하겠습니다. 

# db_data.json

	{
	  "version" : {
	    "lastest_version_code" : "609",
	    "lastest_version_name" : "6.1",
	    "minimum_version_code" : "609",
	    "minimum_version_name" : "6.1",
	    "force_update_message" : "최신 버전의 쏘카로 업데이트해주세요.",
	    "optional_update_message" : "최신 버전 업데이트가 있어요. 새로운 쏘카 앱으로 설치하시겠어요?"
	  }
	}

아래와 같이 작성을 하면은 

강제업데이트, 선택적 업데이트를 구분할 수 있습니다. 
급하게 대응해야지 되는 HotFix 업데이트가 있으면은 minimum_version_code를 이용해서 강제적으로 업데이트를 유도할 수 있습니다. 

저는 아래 그림과 같은 로직을 처리하기 위한 코드르 작성하도록 하겠습니다. 




	{
	  "version" : {
	    "lastest_version_code" : "609",
	    "lastest_version_name" : "6.1",
	    "minimum_version_code" : "609",
	    "minimum_version_name" : "6.1",
	    "force_update_message" : "최신 버전의 쏘카로 업데이트해주세요.",
	    "optional_update_message" : "최신 버전 업데이트가 있어요. 새로운 쏘카 앱으로 설치하시겠어요?"
	  }
	}


위와 같이 데이터를 구성하면 강제 업데이트, 선택적 업데이트를 구분할 수 있습니다. 급하게 대응해야지 되는 HotFix Update가 있으면은 강제적으로
업데이트를 유도 할 수 있습니다. 

# Firebase Database(Realtime Database)에서 

![Alt text](https://isjang98.github.io/assets/img/firebase_db7.png)


# JSON 가져오기를 통해서 데이타를 추가하도록 하겠습니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db8.png)

위에서 작성한 JSON 데이타를 .json파일로 저장하시고 JSON가져오기를 통해서 데이타를 추가하시면 아래 그림과 같이 추가된 것을 확인할 수 있습니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db9.png)

Firebase Console 사이트 내에서도 각 항목 데이타를 손쉽게 수정 가능합니다. 

기본적으로 Realtime Database규칙은 Firebase Authentication을 요구하고 인증된 유저에게 읽고 쓰는 권한을 가질 수 있습니다. 

저는 read 권한을 아래와 같이 설정하도록 하겠습니다. 
설정하시고 꼭 '게시'를 하여야지 적용이 됩니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db10.png)

시뮬레이터로 읽기/쓰기 테스트도 가능하니 테스트가 필요하시면 이 기능을 사용하시면 됩니다. 

이제 Firebase Realtime Database 구성 및 설정을 마쳤습니다. 

이제는 Android 코드 작성을 하도록 하겠습니다. 
저는 아래 그림과 같은 Logic 처리를 위한 코드를 작성하도록 하겠습니다. 

![Alt text](https://isjang98.github.io/assets/img/firebase_db11.png)

Firebase Realtime Database에서 받아온 데이타 처리를 위한 Data Class를 하나 만듭니다. 

# DBData.java

	public class DBData {

	String lastest_version_code;      /** 최신 버젼 코드      */
	String lastest_version_name;      /** 최신 버젼 명       */
	String minimum_version_code;      /** 최소 버젼 코드      */
	String minimum_version_name;      /** 최소 버젼 명       */
	String force_update_message;      /** 강제 업데이트 메세지 */
	String optional_update_message;   /** 선택 업데이트 메세지 */
	
	  public DBData(){}
	
	  public DBData(String lastest_version_code, 
	  				String lastest_version_name, 
	  				String minimum_version_code, 
	  				String minimum_version_name, 
	  				String force_update_message, 
	  				String optional_update_message){

    	this.lastest_version_code     = lastest_version_code;
    	this.lastest_version_name     = lastest_version_name;
    	this.minimum_version_code     = minimum_version_code;
    	this.minimum_version_name     = minimum_version_name;
    	this.force_update_message     = force_update_message;
    	this.optional_update_message  = optional_update_message;
	  }
	
	  public String getLastest_version_code() {
	    return lastest_version_code;
	  }
	
	  public void setLastest_version_code(String lastest_version_code) {
	    this.lastest_version_code = lastest_version_code;
	  }
	
	  public String getLastest_version_name() {
	    return lastest_version_name;
	  }
	
	  public void setLastest_version_name(String lastest_version_name) {
	    this.lastest_version_name = lastest_version_name;
	  }
	
	  public String getMinimum_version_code() {
	    return minimum_version_code;
	  }
	
	  public void setMinimum_version_code(String minimum_version_code) {
	    this.minimum_version_code = minimum_version_code;
	  }
	
	  public String getMinimum_version_name() {
	    return minimum_version_name;
	  }
	
	  public void setMinimum_version_name(String minimum_version_name) {
	    this.minimum_version_name = minimum_version_name;
	  }
	
	  public String getForce_update_message() {
	    return force_update_message;
	  }
	
	  public void setForce_update_message(String forece_update_message) {
	    this.force_update_message = forece_update_message;
	  }
	
	  public String getOptional_update_message() {
	    return optional_update_message;
	  }
	
	  public void setOptional_update_message(String optional_update_message) {
	    this.optional_update_message = optional_update_message;
	  }
	}




>public DBData(){} 
>
>생성자를 필수로 만들어줘야지 데이타를 가져올때 Error를 발생시키지 않습니다. 

# - DatabaseReference 가져오기 

Realtime Database에서 Data를 읽으려면 DatabaseReference의 인스터스가 필요하므로 아래 같이 인스턴스를 가져옵니다. 



	DatabaseReference rootRef = FirebaseDatabase.getInstance().getReference();
	DatabaseReference myRef = rootRef.getRoot();

# - ValueEventListener 추가
실시간으로 App Data를 Update 해야지 되므로, ValueEventListener를 
myRef에 추가하여 줍니다. 

	DatabaseReference rootRef = FirebaseDatabase.getInstance().getReference();
	DatabaseReference myRef = rootRef.getRoot();

	// Read from the database
	myRef.addValueEventListener(new ValueEventListener() {
	  @Override
	  public void onDataChange(DataSnapshot dataSnapshot) {
    	// This method is called once with the initial value and again
    	// whenever data at this location is updated.


  	}

	@Override
  	public void onCancelled(DatabaseError error) {
    	// Failed to read value
    		Log.e(TAG, "onCancelled: " + error.getMessage());
  		}
	});

여기까지 작성하시고 컴파일 & 실행하시면 
Firebase Realtime Database에서 값이 변경이 되면은 ValueEventListener를 통해서 이벤트로 실시간으로 발생되어집니다. 
만약 모바일 디바이스가 offline상태이면은 OnLine가 되어지면 바로 이벤트가 발생되어집니다. 


	 W/SyncTree: Listen at / failed: DatabaseError: Permission denied
	 
	 에러가 나면은 파베 읽기/쓰기 권한 체크를 해볼것!!


저는 앱버젼 체크 후 강제업데이트/선택업데이트 구분하여서 Dialog를 띄워주고 할 것 이기에 추가적인 코드를 넣어주도록 하겠습니다. 


	
	private void initFirebaseRealTimeDataBase(){
	  DatabaseReference rootRef = FirebaseDatabase.getInstance().getReference();
	  DatabaseReference myRef = rootRef.getRoot();
		
	  // Read from the database
	  myRef.addValueEventListener(new ValueEventListener() {
	    @Override
	    public void onDataChange(DataSnapshot dataSnapshot) {
	      // This method is called once with the initial value and again
	      // whenever data at this location is updated.
	      DBData data =  dataSnapshot.child("version").getValue(DBData.class);
		
	      chkUpdateVersion(data);
		
	    }
		
	    @Override
	    public void onCancelled(DatabaseError error) {
	      // Failed to read value
	      Log.e(TAG, "onCancelled: " + error.getMessage());
	    }
	  });
	}


# - 버젼 체크 
	private void chkUpdateVersion(DBData data){
	  int appVersionCode      = BuildConfig.VERSION_CODE;
	  int minVersionCode      = Integer.parseInt(data.minimum_version_code);
	  int latestVersionCode   = Integer.parseInt(data.lastest_version_code);
	
	  String skipVerCode = getSharedPreferences("pref", MODE_PRIVATE).getString("skip_version", "");
	
	  if (appVersionCode < minVersionCode){
	    forceUpdatePopup(data.force_update_message);
	  }else if(appVersionCode < latestVersionCode && !skipVerCode.equals(String.valueOf(latestVersionCode))){
	    optionalUpdatePopup(data.optional_update_message, latestVersionCode);
	  }
	}


# - 강제 업데이트 팝업
	private void forceUpdatePopup(String msg){
	
	  new AlertDialog.Builder(this)
	      .setMessage(msg)
	      .setPositiveButton("Install", new DialogInterface.OnClickListener() {
	        public void onClick(DialogInterface dialog, int which) {
	          // continue with delete
	          /** GOTO PlayStore */
	        }
	      })
	      .show();
	}
 
# - 선택업데이트 팝업
	private void optionalUpdatePopup(String msg, final int versionCode){
	
	  new AlertDialog.Builder(this)
	      .setMessage(msg)
	      .setPositiveButton("Install", new DialogInterface.OnClickListener() {
	        public void onClick(DialogInterface dialog, int which) {
	          // continue with delete
	          /** GOTO PlayStore */
	        }
	      })
	      .setNegativeButton("Later", new DialogInterface.OnClickListener() {
	        public void onClick(DialogInterface dialog, int which) {
	          // do nothing
	          pref = getSharedPreferences("pref", MODE_PRIVATE);
	          SharedPreferences.Editor editor = pref.edit();
	          editor.putString("skip_version", String.valueOf(versionCode));
	          editor.commit();
	
	          dialog.dismiss();
	        }
	      })
	      .show();
	}
	
	
# 강제업데이트 실행화면 
![Alt text](https://isjang98.github.io/assets/img/firebase_db12.png)

# 선택업데이트 실행화면
![Alt text](https://isjang98.github.io/assets/img/firebase_db13.png)
