pipeline{
  agent {any}
   tools{
        node 'nodejs'
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
    stage ("Build Application  "){
      steps{
        sh "npm install"
      }
    }
    stage("Test Application"){
      steps{
        sh "npm test"
      }
    }
  }
        
}
