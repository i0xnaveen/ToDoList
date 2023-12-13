pipeline{
  agent any
   tools{
        jdk 'jdk17'
        nodejs 'node16'
  }
  environment{
        SCANNER_HOME = tool'sonar-scanner'
  }
  stages{
    stage("Cleanup Workspace"){
      steps{
        cleanWs()
      }
    }
    stage("checkout from SCM"){
      steps{
        git branch:'main',credentialsId:'github',url:'https://github.com/i0xnaveen/ToDoList'
      }
    }
    stage("Sonarqube-analysis"){
      steps{
        withSonarQubeEnv('SonarQube-Server'){ 
          sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=ToDoList-CICD -Dsonar.projectKey=ToDoList-CICD '''
        }
      }
    }
    stage("Quality Gate"){
      steps{
        script{
           waitForQualityGate abortPipeline: false, credentialsId: 'SonarQube-Token'
        }
      }
    }
    stage ("Build Application  "){
      steps{
        
        sh "npm install"
      }
    }
    stage('TRIVY FS SCAN') {
      steps{
        sh "trivy fs . > trivyfs.txt"
      }    
  }
    stage("Docker build and push"){
      steps{
        script{
          withDockerRegistry(credentialsId:'dockerhub',toolname:'docker'){
            sh "docker build -t todo ."
            sh "docker tag todo i0xnaveen/todo:latest"
            sh " docker push i0xnaveen/todo:latest"
          }
          }
      }
    }
    stage("Image Scan"){
      steps{
        sh "trivy image ashfaque9x/youtube-clone:latest > trivyimage.txt"
      }
    }
        
}
}
