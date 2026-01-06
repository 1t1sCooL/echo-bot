pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "1t1scool/echo-bot"
    }
    stages {
        stage('Build & Push') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} -t ${DOCKER_IMAGE}:latest ."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }
        stage('Deploy to K8s') {
            steps {
                sh "sed -i 's|image: .*|image: ${DOCKER_IMAGE}:${BUILD_NUMBER}|g' kubernetes/deployment.yaml"
                sh "kubectl apply -f kubernetes/deployment.yaml"
            }
        }
    }
}