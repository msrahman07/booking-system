FROM mcr.microsoft.com/dotnet/sdk:6.0.11 AS build-env
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o publish BookingSystem.sln

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0.11
WORKDIR /App
COPY --from=build-env /App/publish .
ENTRYPOINT ["dotnet", "API.dll"]