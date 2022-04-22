1. 프로젝트 폴더에서 터미널 열고, 해당 명령어 입력하여 라이브러리 설치.
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add @react-navigation/bottom-tabs
yarn add react-native 
yarn add react-native-screens
yarn add react-native-safe-area-context
yarn add react-native-vector-icons
>> android/app/build.gradle 디렉토리에서 최하단에 다음 코드 추가
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
project.ext.vectoricons =[
    iconFontNames:['MaterialIcons.ttf']
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 
yarn add uuid
yarn add react-native-get-random-values


-------------------------------------
빼놓은 라이브러리 있을수도 있으니 실행시켜보고 오류 비교해가면서 라이브러리 추가로 다운받으세요