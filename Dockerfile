# 1. Build Stage (.NET 8 SDK)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY backend/WebUsbBackend.csproj backend/
RUN dotnet restore backend/WebUsbBackend.csproj

COPY backend/ backend/
WORKDIR /src/backend
RUN dotnet publish -c Release -o /app/publish

# 2. Runtime Stage (.NET 8 ASP.NET Core)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# Sao chep cac file giao dien Web de backend phuc vu
COPY *.html *.js *.css ./webusb/
COPY Setup_USB_AnToan_v2.5.exe* ./

ENV ASPNETCORE_ENVIRONMENT=Production
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "WebUsbBackend.dll"]

