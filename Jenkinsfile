pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
     environment {
            CI = 'true'
        }
    stages {
        stage('Build') {
            steps {
                sh 'npm install yarn'
                sh 'yarn install'
            }
        }
        stage('Test') {
                    steps {
                        echo "System is testing ${CI}"
                        sh 'yarn --version'
                    }
                }
                stage('Deliver') {
                            steps {
                                sh './deliver.sh'
                                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                                sh './kill.sh'
                            }
                        }

    }
}
