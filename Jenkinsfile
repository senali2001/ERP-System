pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/senali2001/ERP-System.git'
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd test'   // Windows Jenkins
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd clean package -DskipTests'
                }
            }
        }

        stage('Frontend install &build') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Run System') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }
}