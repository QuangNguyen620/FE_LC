pipeline {
    agent {
        docker {
            image 'node:latest'
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
                sh 'yarn set version 1.22.17'
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
                                sh "chmod +x -R ${env.WORKSPACE}"
                                sh './deliver.sh'
                                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                                sh './kill.sh'
                            }
                        }

    }
}
