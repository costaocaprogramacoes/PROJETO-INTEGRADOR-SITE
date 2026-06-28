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
    { "id": 47, "categoria": "TECLADO", "nome": "Redragon Kumara K552 RGB", "score": 100, "precoOriginal": "279", "precoPromocao": "229", "imagem": "./img_loja/teclado/Redragon Kumara K552 RGB.webp", "video": null },
    { "id": 48, "categoria": "TECLADO", "nome": "Redragon Fizz K617 RGB", "score": 98, "precoOriginal": "249", "precoPromocao": "199", "imagem": "./img_loja/teclado/Redragon Fizz K617 RGB.webp", "video": null },
    { "id": 49, "categoria": "TECLADO", "nome": "HyperX Alloy Origins Core", "score": 99, "precoOriginal": "599", "precoPromocao": "499", "imagem": "./img_loja/teclado/HyperX Alloy Origins Core.webp", "video": null },
    { "id": 50, "categoria": "TECLADO", "nome": "Logitech G413 SE", "score": 98, "precoOriginal": "479", "precoPromocao": "399", "imagem": "./img_loja/teclado/logitechg413.webp", "video": null },
    { "id": 51, "categoria": "TECLADO", "nome": "Logitech G Pro X TKL Lightspeed", "score": 100, "precoOriginal": "1599", "precoPromocao": "1399", "imagem": "./img_loja/teclado/Logitech G Pro X TKL Lightspeed.webp", "video": null },
    { "id": 52, "categoria": "TECLADO", "nome": "Corsair K70 Core RGB", "score": 99, "precoOriginal": "799", "precoPromocao": "699", "imagem": "./img_loja/teclado/Corsair K70 Core RGB.webp", "video": null },
    { "id": 53, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 3050 8GB Dual OC", "score": 98, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/placavideo/GeForce RTX 3050 8GB Dual OC.webp", "video": null },
    { "id": 54, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 3060 Ventus 2X 12GB", "score": 99, "precoOriginal": "2199", "precoPromocao": "1899", "imagem": "./img_loja/placavideo/GeForce RTX 3060 Ventus 2X 12GB.webp", "video": null },
    { "id": 55, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 3060 Ti Eagle 8GB", "score": 99, "precoOriginal": "2699", "precoPromocao": "2399", "imagem": "./img_loja/placavideo/GeForce RTX 3060 Ti Eagle 8GB.webp", "video": null },
    { "id": 56, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4060 Dual OC 8GB", "score": 100, "precoOriginal": "2399", "precoPromocao": "2099", "imagem": "./img_loja/placavideo/GeForce RTX 4060 Dual OC 8GB.webp", "video": null },
    { "id": 57, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4060 Ti Gaming X 8GB", "score": 100, "precoOriginal": "2999", "precoPromocao": "2699", "imagem": "./img_loja/placavideo/GeForce RTX 4060 Ti Gaming X 8GB.webp", "video": null },
    { "id": 58, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4070 WindForce OC 12GB", "score": 100, "precoOriginal": "4399", "precoPromocao": "3999", "imagem": "./img_loja/placavideo/GeForce RTX 4070 WindForce OC 12GB.webp", "video": null },
    { "id": 59, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4070 SUPER Dual OC", "score": 100, "precoOriginal": "4899", "precoPromocao": "4499", "imagem": "./img_loja/placavideo/GeForce RTX 4070 SUPER Dual OC.webp", "video": null },
    { "id": 60, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4070 Ti SUPER Gaming X Slim", "score": 100, "precoOriginal": "6399", "precoPromocao": "5999", "imagem": "./img_loja/placavideo/GeForce RTX 4070 Ti SUPER Gaming X Slim.webp", "video": null },
    { "id": 61, "categoria": "PLACA DE VÍDEO", "nome": "GeForce RTX 4080 SUPER Aero OC", "score": 100, "precoOriginal": "8499", "precoPromocao": "7999", "imagem": "./img_loja/placavideo/GeForce RTX 4080 SUPER Aero OC.webp", "video": null },
    { "id": 62, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6600 Challenger D 8GB", "score": 97, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/placavideo/Radeon RX 6600 Challenger D 8GB.webp", "video": null },
    { "id": 63, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6650 XT Pulse 8GB", "score": 98, "precoOriginal": "1999", "precoPromocao": "1799", "imagem": "./img_loja/placavideo/Radeon RX 6650 XT Pulse 8GB.webp", "video": null },
    { "id": 64, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6700 XT Pulse 12GB", "score": 98, "precoOriginal": "2699", "precoPromocao": "2399", "imagem": "./img_loja/placavideo/Radeon RX 6700 XT Pulse 12GB.webp", "video": null },
    { "id": 65, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 6750 XT QICK 319", "score": 99, "precoOriginal": "2999", "precoPromocao": "2699", "imagem": "./img_loja/placavideo/Radeon RX 6750 XT QICK 319.webp", "video": null },
    { "id": 66, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 7600 Steel Legend 8GB", "score": 98, "precoOriginal": "2299", "precoPromocao": "1999", "imagem": "./img_loja/placavideo/Radeon RX 7600 Steel Legend 8GB.webp", "video": null },
    { "id": 67, "categoria": "PLACA DE VÍDEO", "nome": "Radeon RX 7700 XT Pulse 12GB", "score": 99, "precoOriginal": "3599", "precoPromocao": "3299", "imagem": "./img_loja/placavideo/Radeon RX 7700 XT Pulse 12GB.webp", "video": null },
    { "id": 68, "categoria": "PLACA MAE", "nome": "ASUS Prime B550M-A", "score": 100, "precoOriginal": "799", "precoPromocao": "699", "imagem": "./img_loja/placamae/ASUS Prime B550M.webp", "video": null },
    { "id": 69, "categoria": "PLACA MAE", "nome": "Gigabyte B550M DS3H", "score": 99, "precoOriginal": "749", "precoPromocao": "649", "imagem": "./img_loja/placamae/Gigabyte B550M DS3H.webp", "video": null },
    { "id": 70, "categoria": "PLACA MAE", "nome": "MSI MAG B550 Tomahawk", "score": 100, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/placamae/MSI MAG B550 Tomahawk.webp", "video": null },
    { "id": 71, "categoria": "PLACA MAE", "nome": "ASUS TUF Gaming B650M-Plus WiFi", "score": 100, "precoOriginal": "1599", "precoPromocao": "1399", "imagem": "./img_loja/placamae/ASUS TUF Gaming B650M-Plus WiFi.webp", "video": null },
    { "id": 72, "categoria": "PLACA MAE", "nome": "Gigabyte B650 Aorus Elite AX", "score": 100, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/placamae/Gigabyte B650 Aorus Elite AX.webp", "video": null },
    { "id": 73, "categoria": "PLACA MAE", "nome": "MSI PRO B760M-A WiFi DDR5", "score": 99, "precoOriginal": "1299", "precoPromocao": "1199", "imagem": "./img_loja/placamae/MSI PRO B760M-ADDR5.webp", "video": null },
    { "id": 74, "categoria": "PLACA MAE", "nome": "ASUS Prime B760M-A D4", "score": 99, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/placamae/ASUS Prime B760M-A D4.webp", "video": null },
    { "id": 75, "categoria": "PLACA MAE", "nome": "Gigabyte Z790 Aorus Elite AX", "score": 100, "precoOriginal": "2399", "precoPromocao": "2199", "imagem": "./img_loja/placamae/Gigabyte Z790 Aorus Elite AX.webp", "video": null },
    { "id": 76, "categoria": "MEMORIA", "nome": "Kingston Fury Beast 8GB DDR4 3200MHz", "score": 98, "precoOriginal": "199", "precoPromocao": "169", "imagem": "./img_loja/memoriaram/Kingston Fury Beast 8GB DDR4 3200MHz.webp", "video": null },
    { "id": 77, "categoria": "MEMORIA", "nome": "Kingston Fury Beast 16GB DDR4 3200MHz", "score": 99, "precoOriginal": "349", "precoPromocao": "299", "imagem": "./img_loja/memoriaram/Kingston Fury Beast 8GB DDR4 3200MHz.webp", "video": null },
    { "id": 78, "categoria": "MEMORIA", "nome": "Kingston Fury Beast 16GB DDR5 5600MHz", "score": 100, "precoOriginal": "449", "precoPromocao": "399", "imagem": "./img_loja/memoriaram/Kingston Fury Beast 16GB DDR5 5600MHz.webp", "video": null },
    { "id": 79, "categoria": "MEMORIA", "nome": "Corsair Vengeance LPX 16GB DDR4 3200MHz", "score": 99, "precoOriginal": "379", "precoPromocao": "329", "imagem": "./img_loja/memoriaram/Corsair Vengeance LPX 16GB DDR4 3200MHz.webp", "video": null },
    { "id": 80, "categoria": "MEMORIA", "nome": "Corsair Vengeance RGB 32GB DDR5 6000MHz", "score": 100, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/memoriaram/Corsair Vengeance RGB 32GB DDR5 6000MHz.webp", "video": null },
    { "id": 81, "categoria": "MEMORIA", "nome": "XPG Gammix D35 16GB DDR4 3200MHz", "score": 98, "precoOriginal": "329", "precoPromocao": "279", "imagem": "./img_loja/memoriaram/XPG Gammix D35 16GB DDR4 3200MHz.webp", "video": null },
    { "id": 82, "categoria": "MEMORIA", "nome": "XPG Lancer RGB 16GB DDR5 6000MHz", "score": 99, "precoOriginal": "529", "precoPromocao": "459", "imagem": "./img_loja/memoriaram/XPG Lancer RGB 16GB DDR5 6000MHz.webp", "video": null },
    { "id": 83, "categoria": "MEMORIA", "nome": "Crucial Pro 16GB DDR5 5600MHz", "score": 98, "precoOriginal": "449", "precoPromocao": "389", "imagem": "./img_loja/memoriaram/Crucial Pro 16GB DDR5 5600MHz RAM.webp", "video": null },
    { "id": 84, "categoria": "MEMORIA", "nome": "TeamGroup T-Force Vulcan Z 16GB DDR4", "score": 98, "precoOriginal": "319", "precoPromocao": "269", "imagem": "./img_loja/memoriaram/TeamGroup T-Force Vulcan Z 16GB DDR4.webp", "video": null },
    { "id": 85, "categoria": "MEMORIA", "nome": "TeamGroup T-Force Delta RGB DDR5 32GB", "score": 100, "precoOriginal": "1049", "precoPromocao": "949", "imagem": "./img_loja/memoriaram/TeamGroup T-Force Delta RGB DDR5 32GB.webp", "video": null },
    { "id": 86, "categoria": "MEMORIA", "nome": "G.Skill Ripjaws S5 32GB DDR5 6000MHz", "score": 100, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/memoriaram/G.Skill Ripjaws S5 32GB DDR5 6000MHz.webp", "video": null },
    { "id": 87, "categoria": "FONTE", "nome": "Corsair CV650 650W 80 Plus Bronze", "score": 98, "precoOriginal": "449", "precoPromocao": "399", "imagem": "./img_loja/fonte/Corsair CV650 650W 80 Plus Bronze.webp", "video": null },
    { "id": 88, "categoria": "FONTE", "nome": "MSI MAG A650BN 650W Bronze", "score": 97, "precoOriginal": "379", "precoPromocao": "329", "imagem": "./img_loja/fonte/MSI MAG A650BN 650W Bronze.webp", "video": null },
    { "id": 89, "categoria": "FONTE", "nome": "XPG Core Reactor II 850W Gold", "score": 100, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/fonte/XPG Core Reactor II 850W Gold.webp", "video": null },
    { "id": 90, "categoria": "FONTE", "nome": "Cooler Master MWE 650 Bronze V2", "score": 98, "precoOriginal": "449", "precoPromocao": "379", "imagem": "./img_loja/fonte/Cooler Master MWE 650 Bronze V2.webp", "video": null },
    { "id": 91, "categoria": "MONITOR", "nome": "LG UltraGear 24GN60R-B 24\" 144Hz", "score": 99, "precoOriginal": "899", "precoPromocao": "799", "imagem": "./img_loja/monitor/LG UltraGear 24GN60R-B 24 144Hz.webp", "video": null },
    { "id": 92, "categoria": "MONITOR", "nome": "LG UltraGear 27GN750-B 27\" 240Hz", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/monitor/LG UltraGear 27GN750-B 27 240Hz.webp", "video": null },
    { "id": 93, "categoria": "MONITOR", "nome": "Samsung Odyssey G3 24\" 144Hz", "score": 98, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/monitor/Samsung Odyssey G3 24 144Hz.webp", "video": null },
    { "id": 94, "categoria": "MONITOR", "nome": "Samsung Odyssey G5 27\" QHD 165Hz", "score": 99, "precoOriginal": "1699", "precoPromocao": "1499", "imagem": "./img_loja/monitor/Samsung Odyssey G5 27 QHD 165Hz.webp", "video": null },
    { "id": 95, "categoria": "MONITOR", "nome": "Samsung Odyssey G4 25\" 240Hz", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/monitor/Samsung Odyssey G4 25 240Hz.webp", "video": null },
    { "id": 96, "categoria": "MONITOR", "nome": "AOC Hero 24G2S/BK 24\" 165Hz", "score": 99, "precoOriginal": "999", "precoPromocao": "899", "imagem": "./img_loja/monitor/AOC Hero 24G2S.webp", "video": null },
    { "id": 97, "categoria": "MONITOR", "nome": "AOC Hero 27G2S 27\" 165Hz", "score": 99, "precoOriginal": "1399", "precoPromocao": "1199", "imagem": "./img_loja/monitor/AOC Hero 27G2S 27.webp", "video": null },
    { "id": 98, "categoria": "MONITOR", "nome": "ASUS TUF Gaming VG249Q1A 24\" 165Hz", "score": 99, "precoOriginal": "1199", "precoPromocao": "1099", "imagem": "./img_loja/monitor/ASUS TUF Gaming VG249Q1A 24.webp", "video": null },
    { "id": 99, "categoria": "MONITOR", "nome": "ASUS TUF Gaming VG27AQ3A 27\" 180Hz", "score": 100, "precoOriginal": "1899", "precoPromocao": "1699", "imagem": "./img_loja/monitor/ASUS TUF Gaming VG27AQ3A 27.webp", "video": null },
    { "id": 100, "categoria": "MONITOR", "nome": "Gigabyte G24F 2 24\" 180Hz", "score": 99, "precoOriginal": "1199", "precoPromocao": "1099", "imagem": "./img_loja/monitor/Gigabyte G24F 2 24.webp", "video": null },
    { "id": 101, "categoria": "MONITOR", "nome": "Gigabyte M27Q 27\" QHD 170Hz", "score": 100, "precoOriginal": "2399", "precoPromocao": "2199", "imagem": "./img_loja/monitor/Gigabyte M27Q 27.webp", "video": null },
    { "id": 102, "categoria": "MONITOR", "nome": "MSI G244F 24\" 170Hz", "score": 99, "precoOriginal": "1099", "precoPromocao": "999", "imagem": "./img_loja/monitor/MSI G244F 24.webp", "video": null },
    { "id": 103, "categoria": "MONITOR", "nome": "MSI MAG 274QRFW 27\" QHD 180Hz", "score": 100, "precoOriginal": "2299", "precoPromocao": "2099", "imagem": "./img_loja/monitor/MSI MAG 274QRFW 27.webp", "video": null },
];

const ITENS_POR_PAGINA = 9; // Fica muito melhor numa grid preenchida com múltiplas linhas de 3
let paginaAtual = 1;
let termoPesquisa = "";

const containerProdutos = document.getElementById("container-produtos");
const containerPaginacao = document.getElementById("container-paginacao");
const searchBox = document.getElementById("search-box");
const btnLupa = document.querySelector(".btn-lupa");

document.addEventListener("DOMContentLoaded", () => {
    renderizarLoja();
    configurarEventos();
});

function renderizarLoja() {
    const checkboxesMarcados = Array.from(document.querySelectorAll('.filtro-grupo input[type="checkbox"]:checked')).map(cb => cb.value);

    const produtosFiltrados = produtos.filter(produto => {
        const matchesCategoria = checkboxesMarcados.length === 0 || checkboxesMarcados.includes(produto.categoria);
        const matchesPesquisa = produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) || 
                                produto.categoria.toLowerCase().includes(termoPesquisa.toLowerCase());
        return matchesCategoria && matchesPesquisa;
    });

    const totalItens = produtosFiltrados.length;
    const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA) || 1;
    
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    renderizarCards(produtosPagina);
    renderizarBotoesPaginacao(totalPaginas);
}

function renderizarCards(listaProdutos) {
    containerProdutos.innerHTML = "";

    if (listaProdutos.length === 0) {
        containerProdutos.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #7070A0; margin-top: 40px;">Nenhum produto encontrado.</p>`;
        return;
    }

    listaProdutos.forEach(produto => {
        const cardHTML = `
            <div class="card">
                <div class="video-container">
                    <img class="card1-img" src="${produto.imagem}" alt="${produto.nome}">
                    ${produto.video ? `
                        <video class="video-hover" autoplay muted loop playsinline>
                            <source src="${produto.video}" type="video/mp4">
                        </video>
                    ` : ''}
                </div>
                <div class="cardp"><p>${produto.categoria}</p></div>
                <div class="h1"><p>${produto.nome}</p></div>
                <div class="score"><p>🔹Score ${produto.score}/100</p></div>
                <div class="precos"><span>R$ ${produto.precoOriginal}</span></div>
                <div class="promos"><span>R$ ${produto.precoPromocao}</span></div>
                <div class="botao"><button onclick="comprarItem(${produto.id})">Comprar</button></div>
            </div>
        `;
        containerProdutos.innerHTML += cardHTML;
    });
}

function renderizarBotoesPaginacao(totalPaginas) {
    containerPaginacao.innerHTML = "";
    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
        const botao = document.createElement("button");
        botao.innerText = i;
        if (i === paginaAtual) botao.classList.add("ativo");
        
        botao.addEventListener("click", () => {
            paginaAtual = i;
            renderizarLoja();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        containerPaginacao.appendChild(botao);
    }
}

function configurarEventos() {
    document.querySelectorAll('.filtro-grupo input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            paginaAtual = 1;
            renderizarLoja();
        });
    });

    if (searchBox) {
        searchBox.addEventListener("input", (e) => {
            termoPesquisa = e.target.value;
            paginaAtual = 1;
            renderizarLoja();
        });
    }

    if (btnLupa && searchBox) {
        btnLupa.addEventListener("click", () => {
            searchBox.classList.toggle("ativo");
            if (searchBox.classList.contains("ativo")) searchBox.focus();
        });
    }
}

// ... Mantenha todo o seu código de produtos e filtros lá em cima ...

// Substitua a função comprarItem antiga por esta:
function comprarItem(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Busca o carrinho salvo no navegador (ou cria um novo vazio)
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    
    // Verifica se o item já está no carrinho
    let itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        // Clona o produto e adiciona a quantidade = 1
        const produtoParaCarrinho = { ...produto, quantidade: 1 };
        carrinho.push(produtoParaCarrinho);
    }

    // Salva de volta no navegador
    localStorage.setItem('nexus_cart', JSON.stringify(carrinho));

    // Mostra a notificação e atualiza a bolinha
    mostrarToast(`<b>${produto.nome}</b> adicionado ao carrinho!`);
    atualizarBadgeCarrinho();
}

// Funcionalidade da notificação (Toast)
let toastTimeout;
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast-notificacao');
    const toastMsg = document.getElementById('toast-mensagem');
    
    toastMsg.innerHTML = mensagem;
    toast.classList.add('mostrar');

    clearTimeout(toastTimeout);
    // Esconde automaticamente após 5 segundos
    toastTimeout = setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 5000);
}

// Atualiza o numero na bolinha do carrinho
function atualizarBadgeCarrinho() {
    const badge = document.getElementById('badge-carrinho');
    if(!badge) return;

    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    
    // Soma a quantidade de todos os itens
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (totalItens > 0) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Adicione atualizarBadgeCarrinho() dentro do seu DOMContentLoaded lá em cima, 
// ou simplesmente coloque essa linha no final do arquivo para rodar ao carregar a página:
atualizarBadgeCarrinho();