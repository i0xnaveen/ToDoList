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
          sh '''$SCANNER_HOME/sonar-scanner -Dsonar.projectName=ToDoList-CICD -Dsonar.projectKey=ToDoList-CICD '''
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
        
}
