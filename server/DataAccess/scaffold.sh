#!/bin/bash
dotnet ef dbcontext scaffold \
 "Server=localhost;Database=paperdb;User Id=user;Password=pass;" \
 Npgsql.EntityFrameworkCore.PostgreSQL \
 --output-dir Models \
 --context-dir . \
 --context PaperContext  \
 --no-onconfiguring \
 --data-annotations \
 --force