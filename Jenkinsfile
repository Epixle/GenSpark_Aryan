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

        stage('Deploy Simulation') {
            steps {
                sh '''
                    rm -rf staging
                    mkdir -p staging
                    cp -r SDLC/DevOps_Foundations/IAS_Blueprint/frontend/build staging/
                    test -f staging/build/index.html
                    echo "DEPLOY SIMULATION SUCCESS: Build copied to staging and validated."
                '''
            }
        }
    }

    post {
        failure {
            echo 'PIPELINE FAILED: Fix the failing stage and rerun.'
        }
        success {
            echo 'PIPELINE SUCCESS: Build, tests, and deploy simulation passed.'
        }
    }
}
