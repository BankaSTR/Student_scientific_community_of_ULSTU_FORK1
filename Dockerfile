# Используем образ с Java 17
FROM eclipse-temurin:17-jdk-jammy

# Устанавливаем Maven
RUN apt-get update && apt-get install -y maven

# Копируем исходный код
COPY Events_BackEnd /app
WORKDIR /app

# Собираем приложение
RUN mvn clean package -DskipTests

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "target/ChillDude-1.0.war"]