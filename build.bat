cd backend
gradle war
cp app/build/libs/ROOT.war wildfly/standalone/deployments/ROOT.war
cd wildfly/bin
./standalone.bat -c standalone.xml