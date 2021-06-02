pipeline {
  agent any
  options { skipDefaultCheckout() }
  stages {
    stage('Build Project') {
      steps {
        checkout scm
        sh 'cnpm install'
        sh 'npm run build:${build_env}'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build --build-arg env=${build_env} --build-arg idc=${build_idc}  -t ${tag} .'
      }
    }
    stage('Push image') {
      steps {
        sh 'docker push ${tag}'
      }
    }
    stage('Deploy to enviroment') {
      steps {
        sh 'sed -i "s*myimage*${tag}*" kubernetes.yml'
        sh 'sed -i "s*mynamespace*${namespace}*" kubernetes.yml'
        sh 'sed -i "s*appname*${appname}*" kubernetes.yml'

        sh '/usr/local/bin/kubectl --context choice-rancher apply --namespace=${namespace} -f kubernetes.yml'
      }
    }
  }
  environment {
    //修改appname，对应rancher中工作负载（workload）名称
    //必须小写，不支持下划线（_）
    appname = 'web-choice-gray-plat'
    //修改对应项目名称 如 c7p、scm，不同项目间，应用隔离
    //必须小写
    project = 'c7p'
    namespace = "${project}-${params.build_env}"
    tag = "r.cn/${namespace}/${appname}:${env.BUILD_NUMBER}"
    build_env = "${params.build_env}"
    build_idc = "${params.build_idc}"
  }
  parameters {
    choice(name: 'build_env', choices: ['dev','ttt','pre','pro'], description: '将应用部署到以下环境')
    choice(name: 'build_idc', choices: ['default','grey'], description: '选择IDC，请参考apollo配置默认为default')
  }
}