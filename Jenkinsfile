pipeline {
    agent any

    stages {
        stage('Static Code Analysis') {
            // Get path to sonar-scanner,
            // Set variables to be used as organization and projectKey
            environment {
                SCANNER_HOME = tool 'Sonar Scanner 4'
                ORGANIZATION = "bhubr-github"
                PROJECT_NAME = "bhubr-jenkins-manning-sca-lp"
            }
            // We need to wrap nodejs block inside withSonarQubeEnv
            // in order to perform SCA on JavaScript code
            steps {
                withSonarQubeEnv('SonarQube EC2 instance') {
                    nodejs(nodeJSInstallationName: 'Node 16 LTS') {
                        sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.organization=$ORGANIZATION \
                        -Dsonar.java.binaries=build/classes/java/ \
                        -Dsonar.projectKey=$PROJECT_NAME \
                        -Dsonar.sources=src'''
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true, webhookSecretId: 'sonarqube-webhook-secret'
                }
            }
        }
    }
}
