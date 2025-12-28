# Build stage
FROM maven:3.9.0-eclipse-temurin-19 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:19-jre
WORKDIR /app
COPY --from=build /app/target/quoteDesk-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/quoteDesk-0.0.1-SNAPSHOT.jar"]
