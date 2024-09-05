FROM node:20.16.0

# Instalar dependências necessárias para o Puppeteer
RUN apt-get update && apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libxcomposite1 \
  libxrandr2 \
  libasound2 \
  libxdamage1 \
  libgbm-dev \
  libgtk-3-0 \
  libx11-xcb1 \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*


WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]