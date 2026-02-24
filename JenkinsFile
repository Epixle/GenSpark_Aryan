pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Frontend Build & Test') {
            steps {
                dir('SDLC/DevOps_Foundations/IAS_Blueprint/frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm test'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('SDLC/DevOps_Foundations/IAS_Blueprint/backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished (success or failure).'
        }
        failure {
            echo 'Pipeline failed. Fix the failing stage before merging/deploying.'
        }
    }
}
