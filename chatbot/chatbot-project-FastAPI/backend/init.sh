#!/bin/bash

# ========================================================
# AI Chat Project - Database Initialization Script (init.sh)
# ========================================================

# 색상
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 [Step 1] Running init_db.sql as root...${NC}"
mysql -u root -p < sql/init_db.sql

echo -e "${GREEN}🚀 [Step 2] Inserting intents.sql as chatuser...${NC}"
mysql -u chatuser -p aichat < sql/intents.sql

echo -e "${GREEN}🚀 [Step 3] Inserting training_data.sql as chatuser...${NC}"
mysql -u chatuser -p aichat < sql/training_data.sql

echo -e "${GREEN}✅ All done! Database is initialized.${NC}"
