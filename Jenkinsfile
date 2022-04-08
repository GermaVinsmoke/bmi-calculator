pipeline {
    agent any

    stages {
        stage('Continuous integration') {
            stages {
                stage('Check node version and install dependencies') {
                    steps {
                        nodejs(nodeJSInstallationName: 'Node 16 LTS') {
                            sh 'node --version'
                            sh 'npm i -g yarn'
                            sh 'yarn'
                        }
                    }
                }
                stage('Run tests') {
                    steps {
                        nodejs(nodeJSInstallationName: 'Node 16 LTS') {
                            sh 'npm test'
                        }
                    }
                    post {
                        always {
                            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage-output/cobertura-coverage.xml', lineCoverageTargets: '90, 55, 45', failUnhealthy: false, failUnstable: false])
                        }
                    }
                }
            }
        }
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
                        -Dsonar.java.coveragePlugin=cobertura \
                        -Dsonar.flex.cobertura.reportPaths=coverage-output/cobertura-coverage.xml \
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
