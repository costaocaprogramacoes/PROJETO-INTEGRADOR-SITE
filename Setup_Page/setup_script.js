/* =========================================================================
   1. BANCO DE DADOS (JOGOS E PEÇAS)
========================================================================= */

// Catálogo de Jogos (Importado da página de jogos para cálculo de FPS)
const catalogoJogos = [
    { nome: "Cyberpunk 2077", peso: 1.6 },
    { nome: "Valorant", peso: 0.5 },
    { nome: "Baldur's Gate 3", peso: 1.2 },
    { nome: "Fortnite", peso: 0.7 },
    { nome: "Red Dead Redemption 2", peso: 0.7 },
    { nome: "Grand Theft Auto V", peso: 0.7 },
    { nome: "Resident Evil 4 Remake", peso: 1.2 },
    { nome: "Resident Evil Requiem", peso: 1.3 },
    { nome: "Subnautica 2", peso: 1.3 },
    { nome: "Hollow Knight: Silksong", peso: 0.3 },
    { nome: "Microsoft Flight Simulator", peso: 1.6 },
    { nome: "Starfield", peso: 1.6 },
    { nome: "Assassin's Creed Shadows", peso: 1.5 },
    { nome: "Far Cry 6", peso: 1.1 },
    { nome: "Alan Wake 2", peso: 1.7 },
    { nome: "Hogwarts Legacy", peso: 1.4 },
    { nome: "The Last of Us Part I", peso: 1.5 },
    { nome: "Black Myth: Wukong", peso: 1.6 },
    { nome: "Call of Duty: Warzone", peso: 0.9 },
    { nome: "Clair Obscur: Expedition 33", peso: 1.5 },
    { nome: "God of War Ragnarök", peso: 1.3 },
    { nome: "Pragmata", peso: 1.3 },
    { nome: "Avatar: Frontiers of Pandora", peso: 1.5 },
    { nome: "Dying Light: The Beast", peso: 1.5 },
    { nome: "Star Wars Jedi: Survivor", peso: 1.6 },
    { nome: "Lies of P", peso: 1.0 },
    { nome: "The Callisto Protocol", peso: 1.2 },
    { nome: "Forza Horizon 6", peso: 1.5 },
    { nome: "Senua's Saga: Hellblade II", peso: 1.6 },
    { nome: "Horizon Forbidden West Complete Edition", peso: 1.4 },
    { nome: "A Plague Tale: Requiem", peso: 1.5 },
    { nome: "The Last of Us Part II Remastered", peso: 1.4 },
    { nome: "The Witcher 3: Wild Hunt - Complete Edition", peso: 1.4 },
    { nome: "Dragon's Dogma 2", peso: 1.5 },
    { nome: "Marvel's Spider-Man 2", peso: 1.4 },
    { nome: "Crimson Desert", peso: 1.5 },
    { nome: "League of Legends", peso: 0.3 },
    { nome: "Roblox", peso: 0.3 },
    { nome: "Minecraft", peso: 0.6 },
    { nome: "Star Wars Outlaws", peso: 1.5 },
    { nome: "Indiana Jones and the Great Circle", peso: 1.5 },
    { nome: "Silent Hill f", peso: 1.5 },
    { nome: "ARC Raiders", peso: 1.3 },
    { nome: "HELLDIVERS™ 2", peso: 1.2 },
    { nome: "Dispatch", peso: 1.3 },
    { nome: "Dead by Daylight", peso: 0.6 },
    { nome: "Diablo® IV", peso: 0.9 },
    { nome: "Kingdom Come: Deliverance II", peso: 1.6 },
    { nome: "Peak", peso: 0.6 },
    { nome: "Nioh 3", peso: 1.3 },
    { nome: "Mortal Kombat 1", peso: 1.1 }
];

// Sua lista gigante de produtos
const produtos = [
    { "id": 1, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 4080 16GB", "score": 98, "precoOriginal": "7.999", "precoPromocao": "7.299", "imagem": "./img_loja/placavideo/NVIDIA RTX 4080 16GB.webp", "video": null },
    { "id": 2, "categoria": "PROCESSADOR", "nome": "Intel Core i9-13900K", "score": 96, "precoOriginal": "4.599", "precoPromocao": "4.199", "imagem": "./img_loja/processador/Intel Core i9-13900K.webp", "video": null },
    { "id": 3, "categoria": "MOUSE", "nome": "Logitech G Pro X Superlight 2", "score": 96, "precoOriginal": "899", "precoPromocao": "699", "imagem": "./img_loja/mouse/Logitech G Pro X Superlight 2.webp", "video": null },
    { "id": 4, "categoria": "HEADSET", "nome": "Headset ASTRO A10", "score": 99, "precoOriginal": "2399", "precoPromocao": "2199", "imagem": "./img_loja/headset/Headset ASTROA10.webp", "video": null },
    { "id": 5, "categoria": "HEADSET", "nome": "Corsair HS65 Surround", "score": 97, "precoOriginal": "499", "precoPromocao": "449", "imagem": "./img_loja/headset/Corsair HS65 Surround.webp", "video": null },
    { "id": 6, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 9 7950X", "score": 98, "precoOriginal": "4.299", "precoPromocao": "3.799", "imagem": "./img_loja/processador/AMD Ryzen 9 7950X.webp", "video": null },
    { "id": 7, "categoria": "HEADSET", "nome": "Headset Gamer SuperFrame Odin", "score": 100, "precoOriginal": "3299", "precoPromocao": "2999", "imagem": "./img_loja/headset/Headset Gamer SuperFrame Odin.webp", "video": null },
    { "id": 8, "categoria": "MONITOR", "nome": "ASUS ROG Swift 25\" 360Hz", "score": 100, "precoOriginal": "3.299", "precoPromocao": "2.950", "imagem": "./img_loja/monitor/ASUS ROG Swift 25 360Hz.webp", "video": null },
    { "id": 9, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA GeForce RTX 5090", "score": 98, "precoOriginal": "15.000", "precoPromocao": "13.500", "imagem": "./img_loja/placavideo/NVIDIA GeForce RTX 5090.webp", "video": null },
    { "id": 10, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 9 9950X", "score": 100, "precoOriginal": "4.299", "precoPromocao": "4.000", "imagem": "./img_loja/processador/AMD Ryzen 9 9950X.webp", "video": null },
    { "id": 11, "categoria": "MEMORIA", "nome": "Corsair Vengeance RGB DDR5 32GB", "score": 100, "precoOriginal": "899", "precoPromocao": "650", "imagem": "./img_loja/memoriaram/Corsair Vengeance RGB DDR5 32GB.webp", "video": null },
    { "id": 12, "categoria": "HEADSET", "nome": "HyperX Cloud III", "score": 98, "precoOriginal": "549", "precoPromocao": "499", "imagem": "./img_loja/headset/HyperX Cloud III.webp", "video": null },
    { "id": 13, "categoria": "MONITOR", "nome": "Monitor Gamer Curvo AOC 27\" 280Hz", "score": 100, "precoOriginal": "R$ 1.750", "precoPromocao": "R$ 1.499,99", "imagem": "./img_loja/monitor/Monitor Gamer Curvo AOC.webp", "video": null },
    { "id": 14, "categoria": "TECLADO", "nome": "SteelSeries Apex Pro", "score": 100, "precoOriginal": "1.099", "precoPromocao": "950", "imagem": "./img_loja/teclado/SteelSeries Apex Pro.webp", "video": null },
    { "id": 15, "categoria": "PLACA MAE", "nome": "ASUS ROG Strix X870-E Gaming WiFi", "score": 100, "precoOriginal": "2.100", "precoPromocao": "1.850", "imagem": "./img_loja/placamae/ASUS ROG Strix X870-E Gaming WiFi.webp", "video": null },
    { "id": 16, "categoria": "FONTE", "nome": "Corsair RM1000x", "score": 100, "precoOriginal": "1.099,90", "precoPromocao": "950", "imagem": "./img_loja/fonte/Corsair RM1000x.webp", "video": null },
    { "id": 17, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 5 5600", "score": 100, "precoOriginal": "850,00", "precoPromocao": "560", "imagem": "./img_loja/processador/AMD Ryzen 5 5600.webp", "video": null },
    { "id": 18, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 5 5600X", "score": 100, "precoOriginal": "1.450,90", "precoPromocao": " 1.199,99", "imagem": "./img_loja/processador/AMD Ryzen 5 5600X.webp", "video": null },
    { "id": 19, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 5700X", "score": 100, "precoOriginal": "1.880,90", "precoPromocao": "1.599,99", "imagem": "./img_loja/processador/AMD Ryzen 7 5700X.webp", "video": null },
    { "id": 20, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 5800X", "score": 100, "precoOriginal": "2.320,90", "precoPromocao": "1.997,99", "imagem": "./img_loja/processador/AMD Ryzen 7 5800X.webp", "video": null },
    { "id": 21, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 5800X3D", "score": 100, "precoOriginal": "1.164,90", "precoPromocao": "900,99", "imagem": "./img_loja/processador/AMD Ryzen 7 5800X3D.webp", "video": null },
    { "id": 22, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 5 7600", "score": 100, "precoOriginal": "1.100,90", "precoPromocao": "850,99", "imagem": "./img_loja/processador/AMD Ryzen 5 7600.webp", "video": null },
    { "id": 23, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 5 7600X", "score": 100, "precoOriginal": "1.294,90", "precoPromocao": "1.099,99", "imagem": "./img_loja/processador/AMD Ryzen 5 7600X.webp", "video": null },
    { "id": 24, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 7700", "score": 100, "precoOriginal": "2.140,90", "precoPromocao": "1.819,99", "imagem": "./img_loja/processador/AMD Ryzen 7 7700.webp", "video": null },
    { "id": 25, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 7700X", "score": 100, "precoOriginal": "1.900,90", "precoPromocao": "1.648,99", "imagem": "./img_loja/processador/Ryzen 7 7700X.webp", "video": null },
    { "id": 26, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 7800X3D", "score": 100, "precoOriginal": "2.350,90", "precoPromocao": "1.997,99", "imagem": "./img_loja/processador/AMD Ryzen 7 7800X3D.webp", "video": null },
    { "id": 27, "categoria": "PROCESSADOR", "nome": "Intel Core i3-12100F", "score": 100, "precoOriginal": "705,99", "precoPromocao": " 599,99", "imagem": "./img_loja/processador/Intel Core i3-12100F.webp", "video": null },
    { "id": 28, "categoria": "PROCESSADOR", "nome": "Intel Core i5-12400F", "score": 100, "precoOriginal": "1.294,90", "precoPromocao": "899,99", "imagem": "./img_loja/processador/Intel Core i5-12400F.webp", "video": null },
    { "id": 29, "categoria": "PROCESSADOR", "nome": "Intel Core i5-13400F", "score": 100, "precoOriginal": "1.350,99", "precoPromocao": "960,99", "imagem": "./img_loja/processador/Intel Core i5-13400F.webp", "video": null },
    { "id": 30, "categoria": "PROCESSADOR", "nome": "Intel Core i5-13600KF", "score": 100, "precoOriginal": "2.200,90", "precoPromocao": "1.898,99", "imagem": "./img_loja/processador/Intel Core i5-13600KF.webp", "video": null },
    { "id": 31, "categoria": "PROCESSADOR", "nome": "Intel Core i5-14600KF", "score": 100, "precoOriginal": "1.750,90", "precoPromocao": "1.499,99", "imagem": "./img_loja/processador/Intel Core i5-14600KF.webp", "video": null },
    { "id": 32, "categoria": "PROCESSADOR", "nome": "Intel Core i7-13700K", "score": 100, "precoOriginal": "1.900,90", "precoPromocao": "1.649,99", "imagem": "./img_loja/processador/Intel Core i7-13700K.webp", "video": null },
    { "id": 33, "categoria": "PROCESSADOR", "nome": "Intel Core i9-13900K", "score": 100, "precoOriginal": "2.470,90", "precoPromocao": "2.099,99", "imagem": "./img_loja/processador/Intel Core i9-13900K.webp", "video": null },
    { "id": 34, "categoria": "HEADSET", "nome": "HyperX Cloud Stinger 2", "score": 96, "precoOriginal": "279", "precoPromocao": "229", "imagem": "./img_loja/headset/hyperxcloud.webp", "video": null },
    { "id": 35, "categoria": "HEADSET", "nome": "Logitech G335", "score": 97, "precoOriginal": "349", "precoPromocao": "299", "imagem": "./img_loja/headset/LogitechG335.webp", "video": null },
    { "id": 36, "categoria": "HEADSET", "nome": "Logitech G Pro X 2 Lightspeed", "score": 100, "precoOriginal": "1599", "precoPromocao": "1399", "imagem": "./img_loja/headset/Logitech G Pro X 2 Lightspeed.webp", "video": null },
    { "id": 37, "categoria": "HEADSET", "nome": "Redragon Zeus Pro H510 Pro", "score": 96, "precoOriginal": "449", "precoPromocao": "399", "imagem": "./img_loja/headset/Redragon Zeus Pro H510 Pro.webp", "video": null },
    { "id": 38, "categoria": "HEADSET", "nome": "Redragon Lamia 2 H320RGB", "score": 95, "precoOriginal": "279", "precoPromocao": "229", "imagem": "./img_loja/headset/Redragon Lamia 2 H320RGB.webp", "video": null },
    { "id": 39, "categoria": "HEADSET", "nome": "Razer BlackShark V2 X", "score": 98, "precoOriginal": "329", "precoPromocao": "279", "imagem": "./img_loja/headset/Razer BlackShark V2 X.webp", "video": null },
    { "id": 40, "categoria": "MOUSE", "nome": "Logitech G203 Lightsync", "score": 96, "precoOriginal": "169", "precoPromocao": "129", "imagem": "./img_loja/mouse/Logitech G203 Lightsync.webp", "video": null },
    { "id": 41, "categoria": "MOUSE", "nome": "Logitech G502 X", "score": 98, "precoOriginal": "499", "precoPromocao": "399", "imagem": "./img_loja/mouse/Logitech G502 X.webp", "video": null },
    { "id": 42, "categoria": "MOUSE", "nome": "Razer DeathAdder V3", "score": 98, "precoOriginal": "599", "precoPromocao": "499", "imagem": "./img_loja/mouse/Razer DeathAdder V3.webp", "video": null },
    { "id": 43, "categoria": "MOUSE", "nome": "Razer Cobra", "score": 96, "precoOriginal": "899", "precoPromocao": "699", "imagem": "./img_loja/mouse/Razer Cobra.webp", "video": null },
    { "id": 44, "categoria": "MOUSE", "nome": "HyperX Pulsefire Haste 2", "score": 97, "precoOriginal": "419", "precoPromocao": "349", "imagem": "./img_loja/mouse/HyperX Pulsefire Haste.webp", "video": null },
    { "id": 45, "categoria": "MOUSE", "nome": "Redragon Cobra M711 V2", "score": 95, "precoOriginal": "169", "precoPromocao": "129", "imagem": "./img_loja/mouse/Redragon Cobra M711 V2.webp", "video": null },
    { "id": 46, "categoria": "MOUSE", "nome": "Redragon Storm Pro M808-KS", "score": 96, "precoOriginal": "329", "precoPromocao": "259", "imagem": "./img_loja/mouse/Redragon Storm Pro M808-KS.webp", "video": null },
    { "id": 47, "categoria": "MOUSE", "nome": "Razer Viper V3 Pro", "score": 99, "precoOriginal": "1299", "precoPromocao": "1149", "imagem": "./img_loja/mouse/Razer Viper V3 Pro.webp", "video": null },
    { "id": 48, "categoria": "MOUSE", "nome": "SteelSeries Aerox 5 Wireless", "score": 97, "precoOriginal": "899", "precoPromocao": "769", "imagem": "./img_loja/mouse/SteelSeries Aerox 5 Wireless.webp", "video": null },
    { "id": 49, "categoria": "MOUSE", "nome": "Corsair M75 Wireless", "score": 97, "precoOriginal": "799", "precoPromocao": "699", "imagem": "./img_loja/mouse/Corsair M75 Wireless.webp", "video": null },
    { "id": 50, "categoria": "MOUSE", "nome": "ASUS ROG Keris II Ace", "score": 99, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/mouse/ASUS ROG Keris II Ace.webp", "video": null },
    { "id": 51, "categoria": "MOUSE", "nome": "Glorious Model O 2 Wireless", "score": 96, "precoOriginal": "699", "precoPromocao": "599", "imagem": "./img_loja/mouse/Glorious Model O 2 Wireless.webp", "video": null },
    { "id": 52, "categoria": "MOUSE", "nome": "Cooler Master MM712", "score": 95, "precoOriginal": "449", "precoPromocao": "369", "imagem": "./img_loja/mouse/Cooler Master MM712.webp", "video": null },
    { "id": 53, "categoria": "MOUSE", "nome": "Alienware Pro Wireless Gaming Mouse", "score": 97, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/mouse/Alienware Pro Wireless Gaming Mouse.webp", "video": null },
    { "id": 54, "categoria": "MOUSE", "nome": "MSI Versa 300 Wireless", "score": 95, "precoOriginal": "399", "precoPromocao": "339", "imagem": "./img_loja/mouse/MSI Versa 300 Wireless.webp", "video": null },
    { "id": 55, "categoria": "TECLADO", "nome": "Redragon Kumara K552 RGB", "score": 100, "precoOriginal": "279", "precoPromocao": "229", "imagem": "./img_loja/teclado/Redragon Kumara K552 RGB.webp", "video": null },
    { "id": 56, "categoria": "TECLADO", "nome": "Redragon Fizz K617 RGB", "score": 98, "precoOriginal": "249", "precoPromocao": "199", "imagem": "./img_loja/teclado/Redragon Fizz K617 RGB.webp", "video": null },
    { "id": 57, "categoria": "TECLADO", "nome": "HyperX Alloy Origins Core", "score": 99, "precoOriginal": "599", "precoPromocao": "499", "imagem": "./img_loja/teclado/HyperX Alloy Origins Core.webp", "video": null },
    { "id": 58, "categoria": "TECLADO", "nome": "Logitech G413 SE", "score": 98, "precoOriginal": "479", "precoPromocao": "399", "imagem": "./img_loja/teclado/logitechg413.webp", "video": null },
    { "id": 59, "categoria": "TECLADO", "nome": "Logitech G Pro X TKL Lightspeed", "score": 100, "precoOriginal": "1599", "precoPromocao": "1399", "imagem": "./img_loja/teclado/Logitech G Pro X TKL Lightspeed.webp", "video": null },
    { "id": 60, "categoria": "TECLADO", "nome": "Corsair K70 Core RGB", "score": 99, "precoOriginal": "799", "precoPromocao": "699", "imagem": "./img_loja/teclado/Corsair K70 Core RGB.webp", "video": null },
    { "id": 61, "categoria": "TECLADO", "nome": "Corsair K70 RGB PRO", "score": 99, "precoOriginal": "1299", "precoPromocao": "1099", "imagem": "./img_loja/teclado/Corsair K70 RGB PRO.webp", "video": null },
    { "id": 62, "categoria": "TECLADO", "nome": "Razer BlackWidow V4", "score": 99, "precoOriginal": "1299", "precoPromocao": "1149", "imagem": "./img_loja/teclado/Razer BlackWidow V4.webp", "video": null },
    { "id": 63, "categoria": "TECLADO", "nome": "SteelSeries Apex Pro TKL Wireless (2023)", "score": 100, "precoOriginal": "1799", "precoPromocao": "1599", "imagem": "./img_loja/teclado/SteelSeries Apex Pro TKL Wireless (2023).webp", "video": null },
    { "id": 64, "categoria": "TECLADO", "nome": "HyperX Alloy Origins 65", "score": 98, "precoOriginal": "699", "precoPromocao": "599", "imagem": "./img_loja/teclado/HyperX Alloy Origins 65.webp", "video": null },
    { "id": 65, "categoria": "TECLADO", "nome": "ASUS ROG Strix Scope II 96 Wireless", "score": 99, "precoOriginal": "1499", "precoPromocao": "1349", "imagem": "./img_loja/teclado/ASUS ROG Strix Scope II 96 Wireless.webp", "video": null },
    { "id": 66, "categoria": "TECLADO", "nome": "Keychron K2 Pro", "score": 98, "precoOriginal": "699", "precoPromocao": "629", "imagem": "./img_loja/teclado/Keychron K2 Pro.webp", "video": null },
    { "id": 67, "categoria": "TECLADO", "nome": "Redragon Fizz Pro K616", "score": 96, "precoOriginal": "449", "precoPromocao": "359", "imagem": "./img_loja/teclado/Redragon Fizz Pro K616.webp", "video": null },
    { "id": 68, "categoria": "TECLADO", "nome": "Corsair K65 Plus Wireless", "score": 98, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/teclado/Corsair K65 Plus Wireless.webp", "video": null },
    { "id": 69, "categoria": "TECLADO", "nome": "Razer Huntsman V3 Pro TKL", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/teclado/Razer Huntsman V3 Pro TKL.webp", "video": null },
    { "id": 70, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 3050 8GB Dual OC", "score": 98, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/placavideo/GeForce RTX 3050 8GB Dual OC.webp", "video": null },
    { "id": 71, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 3060 Ventus 2X 12GB", "score": 99, "precoOriginal": "2199", "precoPromocao": "1899", "imagem": "./img_loja/placavideo/GeForce RTX 3060 Ventus 2X 12GB.webp", "video": null },
    { "id": 72, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 3060 Ti Eagle 8GB", "score": 99, "precoOriginal": "2699", "precoPromocao": "2399", "imagem": "./img_loja/placavideo/GeForce RTX 3060 Ti Eagle 8GB.webp", "video": null },
    { "id": 73, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4060 Dual OC 8GB", "score": 100, "precoOriginal": "2399", "precoPromocao": "2099", "imagem": "./img_loja/placavideo/GeForce RTX 4060 Dual OC 8GB.webp", "video": null },
    { "id": 74, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4060 Ti Gaming X 8GB", "score": 100, "precoOriginal": "2999", "precoPromocao": "2699", "imagem": "./img_loja/placavideo/GeForce RTX 4060 Ti Gaming X 8GB.webp", "video": null },
    { "id": 75, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4070 WindForce OC 12GB", "score": 100, "precoOriginal": "4399", "precoPromocao": "3999", "imagem": "./img_loja/placavideo/GeForce RTX 4070 WindForce OC 12GB.webp", "video": null },
    { "id": 76, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4070 SUPER Dual OC", "score": 100, "precoOriginal": "4899", "precoPromocao": "4499", "imagem": "./img_loja/placavideo/GeForce RTX 4070 SUPER Dual OC.webp", "video": null },
    { "id": 77, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4070 Ti SUPER Gaming X Slim", "score": 100, "precoOriginal": "6399", "precoPromocao": "5999", "imagem": "./img_loja/placavideo/GeForce RTX 4070 Ti SUPER Gaming X Slim.webp", "video": null },
    { "id": 78, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4080 SUPER Aero OC", "score": 100, "precoOriginal": "8499", "precoPromocao": "7999", "imagem": "./img_loja/placavideo/GeForce RTX 4080 SUPER Aero OC.webp", "video": null },
    { "id": 79, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6600 Challenger D 8GB", "score": 97, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/placavideo/Radeon RX 6600 Challenger D 8GB.webp", "video": null },
    { "id": 80, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6650 XT Pulse 8GB", "score": 98, "precoOriginal": "1999", "precoPromocao": "1799", "imagem": "./img_loja/placavideo/Radeon RX 6650 XT Pulse 8GB.webp", "video": null },
    { "id": 81, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6700 XT Pulse 12GB", "score": 98, "precoOriginal": "2699", "precoPromocao": "2399", "imagem": "./img_loja/placavideo/Radeon RX 6700 XT Pulse 12GB.webp", "video": null },
    { "id": 82, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6750 XT QICK 319", "score": 99, "precoOriginal": "2999", "precoPromocao": "2699", "imagem": "./img_loja/placavideo/Radeon RX 6750 XT QICK 319.webp", "video": null },
    { "id": 83, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 7600 Steel Legend 8GB", "score": 98, "precoOriginal": "2299", "precoPromocao": "1999", "imagem": "./img_loja/placavideo/Radeon RX 7600 Steel Legend 8GB.webp", "video": null },
    { "id": 84, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 7700 XT Pulse 12GB", "score": 99, "precoOriginal": "3599", "precoPromocao": "3299", "imagem": "./img_loja/placavideo/Radeon RX 7700 XT Pulse 12GB.webp", "video": null },
    { "id": 85, "categoria": "PLACA MAE", "nome": "ASUS Prime B550M-A", "score": 100, "precoOriginal": "799", "precoPromocao": "699", "imagem": "./img_loja/placamae/ASUS Prime B550M.webp", "video": null },
    { "id": 86, "categoria": "PLACA MAE", "nome": "Gigabyte B550M DS3H", "score": 99, "precoOriginal": "749", "precoPromocao": "649", "imagem": "./img_loja/placamae/Gigabyte B550M DS3H.webp", "video": null },
    { "id": 87, "categoria": "PLACA MAE", "nome": "MSI MAG B550 Tomahawk", "score": 100, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/placamae/MSI MAG B550 Tomahawk.webp", "video": null },
    { "id": 88, "categoria": "PLACA MAE", "nome": "ASUS TUF Gaming B650M-Plus WiFi", "score": 100, "precoOriginal": "1599", "precoPromocao": "1399", "imagem": "./img_loja/placamae/ASUS TUF Gaming B650M-Plus WiFi.webp", "video": null },
    { "id": 89, "categoria": "PLACA MAE", "nome": "Gigabyte B650 Aorus Elite AX", "score": 100, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/placamae/Gigabyte B650 Aorus Elite AX.webp", "video": null },
    { "id": 90, "categoria": "PLACA MAE", "nome": "MSI PRO B760M-A WiFi DDR5", "score": 99, "precoOriginal": "1299", "precoPromocao": "1199", "imagem": "./img_loja/placamae/MSI PRO B760M-ADDR5.webp", "video": null },
    { "id": 91, "categoria": "PLACA MAE", "nome": "ASUS Prime B760M-A D4", "score": 99, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/placamae/ASUS Prime B760M-A D4.webp", "video": null },
    { "id": 92, "categoria": "PLACA MAE", "nome": "Gigabyte Z790 Aorus Elite AX", "score": 100, "precoOriginal": "2399", "precoPromocao": "2199", "imagem": "./img_loja/placamae/Gigabyte Z790 Aorus Elite AX.webp", "video": null },
    { "id": 93, "categoria": "MEMORIA", "nome": "Kingston Fury Beast 8GB DDR4 3200MHz", "score": 98, "precoOriginal": "199", "precoPromocao": "169", "imagem": "./img_loja/memoriaram/Kingston Fury Beast 8GB DDR4 3200MHz.webp", "video": null },
    { "id": 94, "categoria": "MEMORIA", "nome": "Kingston Fury Beast 16GB DDR4 3200MHz", "score": 99, "precoOriginal": "349", "precoPromocao": "299", "imagem": "./img_loja/memoriaram/Kingston Fury Beast 8GB DDR4 3200MHz.webp", "video": null },
    { "id": 95, "categoria": "MEMORIA", "nome": "Kingston Fury Beast 16GB DDR5 5600MHz", "score": 100, "precoOriginal": "449", "precoPromocao": "399", "imagem": "./img_loja/memoriaram/Kingston Fury Beast 16GB DDR5 5600MHz.webp", "video": null },
    { "id": 96, "categoria": "MEMORIA", "nome": "Corsair Vengeance LPX 16GB DDR4 3200MHz", "score": 99, "precoOriginal": "379", "precoPromocao": "329", "imagem": "./img_loja/memoriaram/Corsair Vengeance LPX 16GB DDR4 3200MHz.webp", "video": null },
    { "id": 97, "categoria": "MEMORIA", "nome": "Corsair Vengeance RGB 32GB DDR5 6000MHz", "score": 100, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/memoriaram/Corsair Vengeance RGB 32GB DDR5 6000MHz.webp", "video": null },
    { "id": 98, "categoria": "MEMORIA", "nome": "XPG Gammix D35 16GB DDR4 3200MHz", "score": 98, "precoOriginal": "329", "precoPromocao": "279", "imagem": "./img_loja/memoriaram/XPG Gammix D35 16GB DDR4 3200MHz.webp", "video": null },
    { "id": 99, "categoria": "MEMORIA", "nome": "XPG Lancer RGB 16GB DDR5 6000MHz", "score": 99, "precoOriginal": "529", "precoPromocao": "459", "imagem": "./img_loja/memoriaram/XPG Lancer RGB 16GB DDR5 6000MHz.webp", "video": null },
    { "id": 100, "categoria": "MEMORIA", "nome": "Crucial Pro 16GB DDR5 5600MHz", "score": 98, "precoOriginal": "449", "precoPromocao": "389", "imagem": "./img_loja/memoriaram/Crucial Pro 16GB DDR5 5600MHz RAM.webp", "video": null },
    { "id": 101, "categoria": "MEMORIA", "nome": "TeamGroup T-Force Vulcan Z 16GB DDR4", "score": 98, "precoOriginal": "319", "precoPromocao": "269", "imagem": "./img_loja/memoriaram/TeamGroup T-Force Vulcan Z 16GB DDR4.webp", "video": null },
    { "id": 102, "categoria": "MEMORIA", "nome": "TeamGroup T-Force Delta RGB DDR5 32GB", "score": 100, "precoOriginal": "1049", "precoPromocao": "949", "imagem": "./img_loja/memoriaram/TeamGroup T-Force Delta RGB DDR5 32GB.webp", "video": null },
    { "id": 103, "categoria": "MEMORIA", "nome": "G.Skill Ripjaws S5 32GB DDR5 6000MHz", "score": 100, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/memoriaram/G.Skill Ripjaws S5 32GB DDR5 6000MHz.webp", "video": null },
    { "id": 104, "categoria": "FONTE", "nome": "Corsair CV650 650W 80 Plus Bronze", "score": 98, "precoOriginal": "449", "precoPromocao": "399", "imagem": "./img_loja/fonte/Corsair CV650 650W 80 Plus Bronze.webp", "video": null },
    { "id": 105, "categoria": "FONTE", "nome": "MSI MAG A650BN 650W Bronze", "score": 97, "precoOriginal": "379", "precoPromocao": "329", "imagem": "./img_loja/fonte/MSI MAG A650BN 650W Bronze.webp", "video": null },
    { "id": 106, "categoria": "FONTE", "nome": "XPG Core Reactor II 850W Gold", "score": 100, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/fonte/XPG Core Reactor II 850W Gold.webp", "video": null },
    { "id": 107, "categoria": "FONTE", "nome": "Cooler Master MWE 650 Bronze V2", "score": 98, "precoOriginal": "449", "precoPromocao": "379", "imagem": "./img_loja/fonte/Cooler Master MWE 650 Bronze V2.webp", "video": null },
    { "id": 108, "categoria": "FONTE", "nome": "Corsair RM850e 850W Gold", "score": 99, "precoOriginal": "899", "precoPromocao": "799", "imagem": "./img_loja/fonte/Corsair RM850e 850W Gold.webp", "video": null },
    { "id": 109, "categoria": "FONTE", "nome": "MSI MAG A850GL PCIE5 850W Gold", "score": 100, "precoOriginal": "949", "precoPromocao": "849", "imagem": "./img_loja/fonte/MSI MAG A850GL PCIE5 850W Gold.webp", "video": null },
    { "id": 110, "categoria": "FONTE", "nome": "DeepCool PX850G 850W Gold", "score": 99, "precoOriginal": "899", "precoPromocao": "799", "imagem": "./img_loja/fonte/DeepCool PX850G 850W Gold.webp", "video": null },
    { "id": 111, "categoria": "FONTE", "nome": "Thermaltake Toughpower GF A3 750W Gold", "score": 98, "precoOriginal": "749", "precoPromocao": "669", "imagem": "./img_loja/fonte/Thermaltake Toughpower GF A3 750W Gold.webp", "video": null },
    { "id": 112, "categoria": "MONITOR", "nome": "LG UltraGear 24GN60R-B 24\" 144Hz", "score": 99, "precoOriginal": "899", "precoPromocao": "799", "imagem": "./img_loja/monitor/LG UltraGear 24GN60R-B 24 144Hz.webp", "video": null },
    { "id": 113, "categoria": "MONITOR", "nome": "LG UltraGear 27GN750-B 27\" 240Hz", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/monitor/LG UltraGear 27GN750-B 27 240Hz.webp", "video": null },
    { "id": 114, "categoria": "MONITOR", "nome": "Samsung Odyssey G3 24\" 144Hz", "score": 98, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/monitor/Samsung Odyssey G3 24 144Hz.webp", "video": null },
    { "id": 115, "categoria": "MONITOR", "nome": "Samsung Odyssey G5 27\" QHD 165Hz", "score": 99, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/monitor/Samsung Odyssey G5 27 QHD 165Hz.webp", "video": null },
    { "id": 116, "categoria": "MONITOR", "nome": "Samsung Odyssey G4 25\" 240Hz", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/monitor/Samsung Odyssey G4 25 240Hz.webp", "video": null },
    { "id": 117, "categoria": "MONITOR", "nome": "AOC Hero 24G2S/BK 24\" 165Hz", "score": 99, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/monitor/AOC Hero 24G2S.webp", "video": null },
    { "id": 118, "categoria": "MONITOR", "nome": "AOC Hero 27G2S 27\" 165Hz", "score": 99, "precoOriginal": "1399", "precoPromocao": "1199", "imagem": "./img_loja/monitor/AOC Hero 27G2S 27.webp", "video": null },
    { "id": 119, "categoria": "MONITOR", "nome": "ASUS TUF Gaming VG249Q1A 24\" 165Hz", "score": 99, "precoOriginal": "1199", "precoPromocao": "1099", "imagem": "./img_loja/monitor/ASUS TUF Gaming VG249Q1A 24.webp", "video": null },
    { "id": 120, "categoria": "MONITOR", "nome": "ASUS TUF Gaming VG27AQ3A 27\" 180Hz", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/monitor/ASUS TUF Gaming VG27AQ3A 27.webp", "video": null },
    { "id": 121, "categoria": "MONITOR", "nome": "Gigabyte G24F 2 24\" 180Hz", "score": 99, "precoOriginal": "1199", "precoPromocao": "1099", "imagem": "./img_loja/monitor/Gigabyte G24F 2 24.webp", "video": null },
    { "id": 122, "categoria": "MONITOR", "nome": "Gigabyte M27Q 27\" QHD 170Hz", "score": 100, "precoOriginal": "2399", "precoPromocao": "2199", "imagem": "./img_loja/monitor/Gigabyte M27Q 27.webp", "video": null },
    { "id": 123, "categoria": "MONITOR", "nome": "MSI G244F 24\" 170Hz", "score": 99, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/monitor/MSI G244F 24.webp", "video": null },
    { "id": 124, "categoria": "MONITOR", "nome": "MSI MAG 274QRFW 27\" QHD 180Hz", "score": 100, "precoOriginal": "2299", "precoPromocao": "2099", "imagem": "./img_loja/monitor/MSI MAG 274QRFW 27.webp", "video": null },
    { "id": 125, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA GTX 1060 6GB", "score": 60, "precoOriginal": "999", "precoPromocao": "799", "imagem": "./img_loja/placavideo/NVIDIA GTX 1060 6GB.webp", "video": null },
    { "id": 126, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA GTX 1070 8GB", "score": 65, "precoOriginal": "1.299", "precoPromocao": "999", "imagem": "./img_loja/placavideo/NVIDIA GTX 1070 8GB.webp", "video": null },
    { "id": 127, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 2060 6GB", "score": 75, "precoOriginal": "1.799", "precoPromocao": "1.499", "imagem": "./img_loja/placavideo/NVIDIA RTX 2060 6GB.webp", "video": null },
    { "id": 128, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 2070 8GB", "score": 80, "precoOriginal": "1.999", "precoPromocao": "1.699", "imagem": "./img_loja/placavideo/NVIDIA RTX 2070 8GB.webp", "video": null },
    { "id": 129, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 3070 8GB", "score": 88, "precoOriginal": "3.299", "precoPromocao": "2.899", "imagem": "./img_loja/placavideo/NVIDIA RTX 3070 8GB.webp", "video": null },
    { "id": 130, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 3080 10GB", "score": 92, "precoOriginal": "4.499", "precoPromocao": "3.999", "imagem": "./img_loja/placavideo/NVIDIA RTX 3080 10GB.webp", "video": null },
    { "id": 131, "categoria": "PROCESSADOR", "nome": "Intel Core i7-8700K", "score": 75, "precoOriginal": "1.199", "precoPromocao": "999", "imagem": "./img_loja/processador/Intel Core i7-8700K.webp", "video": null },
    { "id": 132, "categoria": "PROCESSADOR", "nome": "Intel Core i7-10700K", "score": 82, "precoOriginal": "1.599", "precoPromocao": "1.399", "imagem": "./img_loja/processador/Intel Core i7-10700K.webp", "video": null },
    { "id": 133, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 5 3600", "score": 70, "precoOriginal": "899", "precoPromocao": "699", "imagem": "./img_loja/processador/AMD Ryzen 5 3600.webp", "video": null },
    { "id": 134, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 5800X", "score": 88, "precoOriginal": "1.699", "precoPromocao": "1.499", "imagem": "./img_loja/processador/AMD Ryzen 7 5800X.webp", "video": null },
    { "id": 135, "categoria": "PLACA DE VÍDEO", "nome": "AMD Radeon RX 580 8GB", "score": 50, "precoOriginal": "850", "precoPromocao": "650", "imagem": "./img_loja/placavideo/AMD Radeon RX 580 8GB.webp", "video": null },
    { "id": 136, "categoria": "PLACA DE VÍDEO", "nome": "AMD Radeon RX 6600 XT", "score": 80, "precoOriginal": "1.799", "precoPromocao": "1.499", "imagem": "./img_loja/placavideo/AMD Radeon RX 6600 XT.webp", "video": null },
    { "id": 137, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 4070 Ti", "score": 96, "precoOriginal": "5.499", "precoPromocao": "4.899", "imagem": "./img_loja/placavideo/NVIDIA RTX 4070 Ti.webp", "video": null },
    { "id": 138, "categoria": "PLACA DE VÍDEO", "nome": "AMD Radeon RX 7900 XTX", "score": 99, "precoOriginal": "6.999", "precoPromocao": "6.299", "imagem": "./img_loja/placavideo/AMD Radeon RX 7900 XTX.webp", "video": null },
    { "id": 139, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA GTX 1660 SUPER", "score": 68, "precoOriginal": "1.399", "precoPromocao": "1.199", "imagem": "./img_loja/placavideo/NVIDIA GTX 1660 SUPER.webp", "video": null },
    { "id": 140, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 2060 SUPER", "score": 82, "precoOriginal": "2.199", "precoPromocao": "1.899", "imagem": "./img_loja/placavideo/NVIDIA GTX 2060 SUPER.webp", "video": null },
    { "id": 141, "categoria": "PLACA DE VÍDEO", "nome": "AMD Radeon RX 6700", "score": 85, "precoOriginal": "2.299", "precoPromocao": "1.999", "imagem": "./img_loja/placavideo/AMD Radeon RX 6700.webp", "video": null },
    { "id": 142, "categoria": "PLACA DE VÍDEO", "nome": "AMD Radeon RX 6800 XT", "score": 94, "precoOriginal": "3.899", "precoPromocao": "3.499", "imagem": "./img_loja/placavideo/AMD Radeon RX 6800 XT.webp", "video": null },
    { "id": 143, "categoria": "PLACA DE VÍDEO", "nome": "AMD Radeon RX 7900 XT", "score": 97, "precoOriginal": "5.699", "precoPromocao": "5.299", "imagem": "./img_loja/placavideo/AMD Radeon RX 7900 XT.webp", "video": null },
    { "id": 144, "categoria": "PROCESSADOR", "nome": "Intel Core i5-8600K", "score": 65, "precoOriginal": "799", "precoPromocao": "599", "imagem": "./img_loja/processador/Intel Core i5-8600K.webp", "video": null },
    { "id": 145, "categoria": "PROCESSADOR", "nome": "Intel Core i7-11700K", "score": 86, "precoOriginal": "1.899", "precoPromocao": "1.699", "imagem": "./img_loja/processador/Intel Core i7-11700K.webp", "video": null },
    { "id": 146, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 5 5600X", "score": 84, "precoOriginal": "1.199", "precoPromocao": "999", "imagem": "./img_loja/processador/AMD Ryzen 5 5600X.webp", "video": null },
    { "id": 147, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 7 3700X", "score": 78, "precoOriginal": "1.399", "precoPromocao": "1.199", "imagem": "./img_loja/processador/AMD Ryzen 7 3700X.webp", "video": null },
    { "id": 148, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 9 7900X", "score": 95, "precoOriginal": "2.899", "precoPromocao": "2.599", "imagem": "./img_loja/processador/AMD Ryzen 9 7900X.webp", "video": null },
    { "id": 149, "categoria": "PLACA MAE", "nome": "Gigabyte B450M DS3H V2", "score": 85, "precoOriginal": "699", "precoPromocao": "549", "imagem": "./img_loja/placamae/Gigabyte B450M DS3H V2.webp", "video": null },
    { "id": 150, "categoria": "PLACA MAE", "nome": "ASUS TUF Gaming B450M-PLUS", "score": 90, "precoOriginal": "850", "precoPromocao": "699", "imagem": "./img_loja/placamae/ASUS TUF Gaming B450M-PLUS.webp", "video": null },
    { "id": 151, "categoria": "PLACA MAE", "nome": "MSI B450 Tomahawk MAX II", "score": 92, "precoOriginal": "950", "precoPromocao": "799", "imagem": "./img_loja/placamae/MSI B450 Tomahawk MAX II.webp", "video": null },
    { "id": 152, "categoria": "PLACA MAE", "nome": "ASUS Prime H610M-K D4", "score": 80, "precoOriginal": "650", "precoPromocao": "499", "imagem": "./img_loja/placamae/ASUS Prime H610M-K D4.webp", "video": null },
    { "id": 153, "categoria": "PLACA MAE", "nome": "Gigabyte H610M H", "score": 82, "precoOriginal": "699", "precoPromocao": "549", "imagem": "./img_loja/placamae/Gigabyte H610M H.webp", "video": null },
    { "id": 154, "categoria": "PLACA MAE", "nome": "MSI PRO B660M-A DDR4", "score": 90, "precoOriginal": "1.299", "precoPromocao": "999", "imagem": "./img_loja/placamae/MSI PRO B660M-A DDR4.webp", "video": null },
    { "id": 155, "categoria": "PLACA MAE", "nome": "ASUS TUF Gaming B760M PLUS D4", "score": 95, "precoOriginal": "1.499", "precoPromocao": "1.299", "imagem": "./img_loja/placamae/ASUS TUF Gaming B760M PLUS D4.webp", "video": null },
    { "id": 156, "categoria": "PLACA MAE", "nome": "Gigabyte X670 AORUS ELITE AX", "score": 98, "precoOriginal": "2.899", "precoPromocao": "2.499", "imagem": "./img_loja/placamae/Gigabyte X670 AORUS ELITE AX.webp", "video": null },
    { "id": 157, "categoria": "PLACA MAE", "nome": "ASUS ROG Strix B650-A Gaming WiFi", "score": 97, "precoOriginal": "2.199", "precoPromocao": "1.899", "imagem": "./img_loja/placamae/ASUS ROG Strix B650-A Gaming WiFi.webp", "video": null },
    { "id": 158, "categoria": "PLACA MAE", "nome": "MSI MAG X670E Tomahawk WiFi", "score": 99, "precoOriginal": "3.199", "precoPromocao": "2.799", "imagem": "./img_loja/placamae/MSI MAG X670E Tomahawk WiFi.webp", "video": null },
    { "id": 159, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 Kingston NV2 1TB", "score": 90, "precoOriginal": "499", "precoPromocao": "389", "imagem": "./img_loja/armazenamento/Kingston NV2 1TB.webp", "video": null },
    { "id": 160, "categoria": "ARMAZENAMENTO", "nome": "SSD SATA Kingston A400 480GB", "score": 75, "precoOriginal": "250", "precoPromocao": "199", "imagem": "./img_loja/armazenamento/Kingston A400 480GB.webp", "video": null },
    { "id": 161, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 Samsung 990 PRO 2TB", "score": 100, "precoOriginal": "1899", "precoPromocao": "1599", "imagem": "./img_loja/armazenamento/Samsung 990 PRO 2TB.webp", "video": null },
    { "id": 162, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 Samsung 980 1TB", "score": 95, "precoOriginal": "699", "precoPromocao": "549", "imagem": "./img_loja/armazenamento/Samsung 980 1TB.webp", "video": null },
    { "id": 163, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 WD Blue SN580 1TB", "score": 92, "precoOriginal": "550", "precoPromocao": "459", "imagem": "./img_loja/armazenamento/WD Blue SN580 1TB.webp", "video": null },
    { "id": 164, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 WD Black SN850X 2TB", "score": 100, "precoOriginal": "1699", "precoPromocao": "1449", "imagem": "./img_loja/armazenamento/WD Black SN850X 2TB.webp", "video": null },
    { "id": 165, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 Crucial P3 Plus 1TB", "score": 93, "precoOriginal": "520", "precoPromocao": "429", "imagem": "./img_loja/armazenamento/Crucial P3 Plus 1TB.webp", "video": null },
    { "id": 166, "categoria": "ARMAZENAMENTO", "nome": "SSD SATA Crucial BX500 500GB", "score": 76, "precoOriginal": "270", "precoPromocao": "219", "imagem": "./img_loja/armazenamento/Crucial BX500 500GB.webp", "video": null },
    { "id": 167, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 Corsair MP600 PRO XT 2TB", "score": 99, "precoOriginal": "1799", "precoPromocao": "1549", "imagem": "./img_loja/armazenamento/Corsair MP600 PRO XT 2TB.webp", "video": null },
    { "id": 168, "categoria": "ARMAZENAMENTO", "nome": "HD Seagate BarraCuda 2TB 7200RPM", "score": 85, "precoOriginal": "450", "precoPromocao": "369", "imagem": "./img_loja/armazenamento/Seagate BarraCuda 2TB.webp", "video": null },
    { "id": 169, "categoria": "ARMAZENAMENTO", "nome": "HD Seagate BarraCuda 1TB 7200RPM", "score": 80, "precoOriginal": "320", "precoPromocao": "259", "imagem": "./img_loja/armazenamento/Seagate BarraCuda 1TB.webp", "video": null },
    { "id": 170, "categoria": "ARMAZENAMENTO", "nome": "HD WD Blue 2TB 7200RPM", "score": 85, "precoOriginal": "460", "precoPromocao": "379", "imagem": "./img_loja/armazenamento/WD Blue 2TB.webp", "video": null },
    { "id": 171, "categoria": "ARMAZENAMENTO", "nome": "HD Toshiba P300 1TB 7200RPM", "score": 78, "precoOriginal": "300", "precoPromocao": "239", "imagem": "./img_loja/armazenamento/Toshiba P300 1TB.webp", "video": null },
    { "id": 172, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 XPG S70 Blade 1TB", "score": 96, "precoOriginal": "650", "precoPromocao": "539", "imagem": "./img_loja/armazenamento/XPG S70 Blade 1TB.webp", "video": null },
    { "id": 173, "categoria": "ARMAZENAMENTO", "nome": "SSD NVMe M.2 Kingston Fury Renegade 2TB", "score": 98, "precoOriginal": "1599", "precoPromocao": "1399", "imagem": "./img_loja/armazenamento/Kingston Fury Renegade 2TB.webp", "video": null }
];

/* =========================================================================
   2. CONFIGURAÇÃO E ORGANIZAÇÃO DOS DADOS
========================================================================= */

// Função que define as especificações (Socket/RAM) baseadas no nome
function extrairEspecificacoes(p) {
    const nome = p.nome.toUpperCase();
    let specs = {};

    if (p.categoria === "PROCESSADOR") {
        if (nome.includes("5600") || nome.includes("5700") || nome.includes("5800")) specs.socket = "AM4";
        else if (nome.includes("7600") || nome.includes("7700") || nome.includes("7800") || nome.includes("7950") || nome.includes("9950")) specs.socket = "AM5";
        else if (nome.includes("12100") || nome.includes("12400") || nome.includes("13400") || nome.includes("13600") || nome.includes("14600") || nome.includes("13700") || nome.includes("13900")) specs.socket = "LGA1700";
    } 
    else if (p.categoria === "PLACA MAE") {
        if (nome.includes("B550")) { specs.socket = "AM4"; specs.ramType = "DDR4"; }
        else if (nome.includes("B650") || nome.includes("X870")) { specs.socket = "AM5"; specs.ramType = "DDR5"; }
        else if (nome.includes("B760") || nome.includes("Z790")) { 
            specs.socket = "LGA1700";
            specs.ramType = nome.includes("D4") ? "DDR4" : "DDR5"; 
        }
    } 
    else if (p.categoria === "MEMORIA") {
        specs.ramType = nome.includes("DDR4") ? "DDR4" : "DDR5";
    }

    return specs;
}

// Estrutura que guarda as peças separadas por categoria
const dbComponentes = { cpu: [], placamae: [], gpu: [], ram: [], armazenamento: [], fonte: [], monitor: [], mouse: [], teclado: [], headset: [] };

// Popula o objeto `dbComponentes` usando a lista gigante
produtos.forEach(p => {
    const item = {
        id: p.id.toString(),
        nome: p.nome,
        nota: p.score,
        preco: p.precoPromocao || p.precoOriginal,
        img: p.imagem,
        specs: extrairEspecificacoes(p)
    };

    if (p.categoria === "PROCESSADOR") dbComponentes.cpu.push(item);
    else if (p.categoria === "PLACA MAE") dbComponentes.placamae.push(item);
    else if (p.categoria === "PLACA DE VÍDEO") dbComponentes.gpu.push(item);
    else if (p.categoria === "MEMORIA") dbComponentes.ram.push(item);
    else if (p.categoria === "FONTE") dbComponentes.fonte.push(item);
    else if (p.categoria === "MONITOR") dbComponentes.monitor.push(item);
    else if (p.categoria === "MOUSE") dbComponentes.mouse.push(item);
    else if (p.categoria === "TECLADO") dbComponentes.teclado.push(item);
    else if (p.categoria === "HEADSET") dbComponentes.headset.push(item);
    else if (p.categoria === "ARMAZENAMENTO") dbComponentes.armazenamento.push(item);
});
// Objeto que rastreia o que o usuário selecionou
const setupSelecionado = {
    cpu: null, placamae: null, gpu: null, ram: null, armazenamento: null, fonte: null, monitor: null, mouse: null, teclado: null, headset: null
};

const ordemMontagem = ['cpu', 'placamae', 'gpu', 'ram', 'armazenamento', 'fonte', 'monitor', 'mouse', 'teclado', 'headset'];

/* =========================================================================
   3. LÓGICA DE RENDERIZAÇÃO E INTERFACE
========================================================================= */

// Renderiza todas as listas e avalia quem fica "cinza" (incompatível)
function renderAllLists() {
    ordemMontagem.forEach(categoria => {
        const container = document.getElementById(`list-${categoria}`);
        if (!container) return;

        container.innerHTML = dbComponentes[categoria].map(item => {
            let compativel = true;
            let motivoIncompatibilidade = "";

            // Verifica se a peça é compatível com o que já foi selecionado
            if (categoria === "cpu" && setupSelecionado.placamae) {
                if (item.specs.socket !== setupSelecionado.placamae.specs.socket) {
                    compativel = false; motivoIncompatibilidade = "Socket incompatível com Placa Mãe";
                }
            }
            if (categoria === "placamae") {
                if (setupSelecionado.cpu && item.specs.socket !== setupSelecionado.cpu.specs.socket) {
                    compativel = false; motivoIncompatibilidade = "Socket incompatível com Processador";
                }
                if (setupSelecionado.ram && item.specs.ramType !== setupSelecionado.ram.specs.ramType) {
                    compativel = false; motivoIncompatibilidade = "Incompatível com a Memória (DDR)";
                }
            }
            if (categoria === "ram" && setupSelecionado.placamae) {
                if (item.specs.ramType !== setupSelecionado.placamae.specs.ramType) {
                    compativel = false; motivoIncompatibilidade = "DDR incompatível com Placa Mãe";
                }
            }

            // Tratamento de rota da imagem
            let caminhoImg = item.img || ""; 
            if (caminhoImg && !caminhoImg.startsWith('http') && !caminhoImg.startsWith('../')) {
                caminhoImg = '../Loja_Page/' + (caminhoImg.startsWith('/') ? caminhoImg.substring(1) : caminhoImg);
            }

            // Verifica se este card específico é o que está selecionado no momento
            const isSelecionado = setupSelecionado[categoria]?.id === item.id;
            const bgSelecionado = isSelecionado ? "background: #0d1e36; border-left: 4px solid #00d9ff;" : "";

            return `
                <div class="component-option ${!compativel ? 'incompativel' : ''}" 
                     style="${bgSelecionado}"
                     onclick="${compativel ? `selecionarPeca('${categoria}', '${item.id}')` : ''}">
                    
                    <img src="${caminhoImg}" alt="${item.nome}" class="comp-img" onerror="this.onerror=null; this.removeAttribute('src');">
                    
                    <div class="comp-details">
                        <span class="comp-name">${item.nome}</span>
                        ${!compativel ? `<span class="aviso-incompativel">⚠️ ${motivoIncompatibilidade}</span>` : ''}
                    </div>
                    <div class="comp-price">R$ ${item.preco}</div>
                </div>
            `;
        }).join('');
    });
}

// Abre/Fecha a sanfona de categorias (Toggle de Menu)
window.toggleAccordion = function(categoria) {
    const item = document.getElementById(`acc-${categoria}`);
    if (!item) return;

    const isAlreadyActive = item.classList.contains('active');

    // Fecha todos
    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
    
    // Se clicou em um que estava fechado, ele abre. (Se já estava aberto, fica fechado).
    if (!isAlreadyActive) {
        item.classList.add('active');
    }
}

// Quando clica em um Produto (Toggle de Peça)
window.selecionarPeca = function(categoria, id) {
    const selSub = document.getElementById(`sel-${categoria}`);
    
    // Se o usuário clicou na peça que JÁ estava selecionada, ele a remove.
    if (setupSelecionado[categoria] && setupSelecionado[categoria].id === id) {
        setupSelecionado[categoria] = null;
        if (selSub) {
            selSub.textContent = "Clique para selecionar...";
            selSub.style.color = "#4b5a82";
        }
    } else {
        // Seleciona a nova peça
        const peca = dbComponentes[categoria].find(p => p.id === id);
        if (!peca) return;

        setupSelecionado[categoria] = peca;
        if (selSub) {
            selSub.textContent = peca.nome;
            selSub.style.color = "#00d9ff";
        }

        // Passa pro próximo accordion apenas se foi uma nova seleção
        const accAtual = document.getElementById(`acc-${categoria}`);
        if (accAtual) accAtual.classList.remove('active');
        
        const atualIndex = ordemMontagem.indexOf(categoria);
        if (atualIndex < ordemMontagem.length - 1) {
            const accProximo = document.getElementById(`acc-${ordemMontagem[atualIndex + 1]}`);
            if (accProximo) accProximo.classList.add('active');
        }
    }

    // Re-renderiza tudo para aplicar os estilos de selecionado/incompatível
    renderAllLists();
    verificarCompatibilidadeGeral();
}

/* =========================================================================
   4. CÁLCULO DE PERFORMANCE (FPS E QUALIDADE)
========================================================================= */

window.verificarCompatibilidadeGeral = function() {
    const resultsContainer = document.getElementById('compat-results');
    if (!resultsContainer) return;

    // Só exibe os cálculos se o cara tiver escolhido Processador e Placa de Vídeo
    if (!setupSelecionado.cpu || !setupSelecionado.gpu) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line></svg></div>
                <p>Selecione um Processador e uma Placa de Vídeo para simular a performance.</p>
            </div>
        `;
        return;
    }
    
    // Somar preço total e calcular "poder" do PC com base nas notas (score)
    let valorTotal = 0;
    
    ordemMontagem.forEach(cat => {
        if (setupSelecionado[cat]) {
            const valor = parseFloat(setupSelecionado[cat].preco.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(valor)) valorTotal += valor;
        }
    });

    // O poder bruto do PC é a média do Score da CPU e da GPU (já que removemos o display do score do visual)
    const pcPower = (setupSelecionado.cpu.nota + setupSelecionado.gpu.nota) / 2;

    // Gerar opções do select (Dropdown) baseado no array 'catalogoJogos'
    const selectOptionsHTML = catalogoJogos.map((jogo, index) => 
        `<option value="${index}">${jogo.nome}</option>`
    ).join('');

    resultsContainer.innerHTML = `
        <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
                <label style="color:#7070A0; font-size:12px; font-weight:bold;">ESCOLHA UM JOGO PARA TESTAR:</label>
                <select id="jogoTestado" onchange="atualizarResultadoFPS(${pcPower})" style="width: 100%; padding: 10px; margin-top: 8px; background: #060a16; color: white; border: 1px solid #1a2340; border-radius: 4px; outline: none; font-size:14px; cursor:pointer;">
                    ${selectOptionsHTML}
                </select>
            </div>
            
            <div id="resultado-fps-box">
                <!-- O FPS aparecerá aqui -->
            </div>

            <div style="margin-top: 30px; background: #060a16; padding: 15px; border-radius: 8px; border: 1px solid #1a2340;">
                <h3 style="color: #7070A0; font-size: 12px;">CUSTO TOTAL APROXIMADO</h3>
                <h2 style="color: #00ff88; font-size: 24px; margin-top: 5px;">
                    R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
                <button class="btn-setup-completo" onclick="adicionarSetupAoCarrinho()" style="margin-top: 15px; padding: 10px; font-size: 12px; cursor: pointer;">ADICIONAR TUDO AO CARRINHO</button>
            </div>
        </div>
    `;

    // Chama a função uma vez para popular o resultado do primeiro jogo do Select
    window.atualizarResultadoFPS(pcPower);
}

// Calcula FPS e Qualidade com base no Jogo escolhido
window.atualizarResultadoFPS = function(pcPower) {
    const selector = document.getElementById('jogoTestado');
    const resultBox = document.getElementById('resultado-fps-box');
    if (!selector || !resultBox) return;

    const jogo = catalogoJogos[selector.value];
    
    // Cálculo estimado (Poder do PC dividido pelo peso de processamento do Jogo)
    const desempenhoCalculado = pcPower / jogo.peso; 
    
    let qualidadeRecomendada = "";
    let fpsEstimado = "";

    if (desempenhoCalculado > 120) {
        qualidadeRecomendada = "ULTRA / EXTREMO";
        fpsEstimado = "144+ FPS";
    } else if (desempenhoCalculado > 90) {
        qualidadeRecomendada = "ALTO / ULTRA";
        fpsEstimado = "60 a 90 FPS";
    } else if (desempenhoCalculado > 60) {
        qualidadeRecomendada = "MÉDIO";
        fpsEstimado = "40 a 60 FPS";
    } else {
        qualidadeRecomendada = "MÍNIMO / BAIXO";
        fpsEstimado = "30 FPS";
    }

    resultBox.innerHTML = `
        <div class="game-result-item">
            <div class="empty-icon" style="width: 40px; height:40px; margin:0; border: 1px solid #00d9ff; color:#00d9ff; font-size:20px;">🎮</div>
            <div class="game-result-info" style="display:flex; flex-direction:column; gap:4px;">
                <span style="color: #7070A0; font-size: 11px;">PREDEFINIÇÃO RECOMENDADA</span>
                <h4 style="color: white; font-size: 16px;">${qualidadeRecomendada}</h4>
                <span style="font-size: 13px; color: #00ff88; font-weight:bold;">Desempenho: ${fpsEstimado}</span>
            </div>
        </div>
    `;
}

/* =========================================================================
   5. INTEGRAÇÃO COM O CARRINHO E AVISOS (TOAST)
========================================================================= */

window.adicionarSetupAoCarrinho = function() {
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let itensAdicionados = 0;

    // Varre a lista de peças montadas no setup
    ordemMontagem.forEach(cat => {
        const pecaSelecionada = setupSelecionado[cat];
        
        if (pecaSelecionada) {
            // Busca o produto original na lista gigante para garantir que temos todos os dados (como categoria correta)
            // Se não achar (como o SSD manual s1), usamos os dados do próprio setupSelecionado
            const produtoOriginal = produtos.find(p => p.id.toString() === pecaSelecionada.id.toString()) || {
                id: pecaSelecionada.id,
                categoria: cat === 'armazenamento' ? 'ARMAZENAMENTO' : cat.toUpperCase(),
                nome: pecaSelecionada.nome,
                precoPromocao: pecaSelecionada.preco,
                imagem: pecaSelecionada.img
            };

            // Verifica se a peça já existe no carrinho
            const itemNoCarrinho = carrinho.find(i => i.id.toString() === produtoOriginal.id.toString());
            
            if (itemNoCarrinho) {
                itemNoCarrinho.quantidade += 1;
            } else {
                carrinho.push({
                    id: produtoOriginal.id,
                    categoria: produtoOriginal.categoria,
                    nome: produtoOriginal.nome,
                    precoPromocao: produtoOriginal.precoPromocao || produtoOriginal.precoOriginal || pecaSelecionada.preco,
                    imagem: produtoOriginal.imagem || pecaSelecionada.img,
                    quantidade: 1
                });
            }
            itensAdicionados++;
        }
    });

    if (itensAdicionados > 0) {
        // Salva no localStorage
        localStorage.setItem('nexus_cart', JSON.stringify(carrinho));
        
        // Atualiza o contador visual do ícone do carrinho, se ele existir na página de setup
        atualizarBadgeSimples();
        
        // Dispara o aviso visual
        mostrarToastSucesso();
    }
}

// Cria e exibe a notificação Toast no canto da tela
function mostrarToastSucesso() {
    let toast = document.getElementById('toast-setup-success');
    
    // Se o elemento ainda não existe, criamos e injetamos no HTML
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-setup-success';
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="background: #00ff88; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #060a16; font-weight: bold; font-size: 14px;">✓</div>
                <div>
                    <strong style="display: block; color: white; font-size: 14px;">Setup Adicionado!</strong>
                    <span style="color: #8a8fb8; font-size: 12px;">Suas peças já estão no carrinho.</span>
                </div>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: -400px;
            background: #060a16;
            border-left: 4px solid #00ff88;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            z-index: 9999;
            transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: inherit;
        `;
        document.body.appendChild(toast);
    }

    // Faz o Toast entrar na tela
    setTimeout(() => { toast.style.right = '30px'; }, 10);

    // Remove o Toast da tela após 3.5 segundos
    setTimeout(() => { toast.style.right = '-400px'; }, 3500);
}

// Função de backup para atualizar a bolinha do carrinho se a header estiver na página de setup
function atualizarBadgeSimples() {
    const badge = document.getElementById('badge-carrinho');
    if (!badge) return;
    
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    if (totalItens > 0) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Iniciar a aplicação na primeira carga
renderAllLists();
atualizarBadgeSimples();