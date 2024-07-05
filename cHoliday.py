# -*- coding: utf-8 -*-
# import
import datetime
import ephem

# class
class isHoliday:
    # Constructor
    def __init__(self, arg=None, **kwargs):
        try:
            self.__year = kwargs["date"].year
            self.__date = datetime.datetime(kwargs["date"].year, kwargs["date"].month, kwargs["date"].day)
        except:
            try:
                self.__year = arg.year
                self.__date = datetime.datetime(arg.year, arg.month, arg.day)
            except:
                try:
                    self.__year = int(kwargs["year"])
                    self.__date = datetime.datetime(self.__year, 1, 1)
                except:
                    self.__date = datetime.datetime.now()
                    self.__year = self.__date.year

        self.__cps = [(20, "Gipuzkoa"), (15, "A Coruna"), (2, "Albacete"), (3, "Alicante"), (4, "Almeria"),
                      (1, "Alava"), (33, "Asturias"), (6, "Badajoz"), (8, "Barcelona"), (48, "Bizkaia"),
                      (9, "Burgos"), (39, "Cantabria"), (12, "Castellon"), (51, "Ceuta"), (13, "Ciudad Real"),
                      (16, "Cuenca"), (10, "Caceres"), (11, "Cadiz"), (14, "Cordoba"), (17, "Girona"),
                      (18, "Granada"), (19, "Guadalajara"), (21, "Huelva"), (22, "Huesca"), (7, "Illes Balears"),
                      (23, "Jaen"), (26, "La Rioja"), (35, "Las Palmas"), (24, "Leon"), (25, "Lleida"), (27, "Lugo"),
                      (28, "Madrid"), (52, "Melilla"), (30, "Murcia"), (29, "Malaga"), (31, "Navarra"), (32, "Ourense"),
                      (34, "Palencia"), (36, "Pontevedra"), (37, "Salamanca"), (38, "Santa Cruz de Tenerife"),
                      (40, "Segovia"), (41, "Sevilla"), (42, "Soria"), (43, "Tarragona"), (44, "Teruel"),
                      (45, "Toledo"), (46, "Valencia"), (47, "Valladolid"), (49, "Zamora"), (50, "Zaragoza"),
                      (5, "Avila")]

        try:
            self.__cp = int(kwargs["cp"])

            if (self.__cp in list(x[0] for x in self.__cps)) is False:
                raise ValueError
        except:
            self.__cp = None

        self.__moons = self.__getMoon()
        self.__holidays = self.__getDays()

    # Sumar dias a una fecha de origen dada
    def __add_days(self, mmdd, days=0, weekday=None):
        out = datetime.datetime(self.__date.year, mmdd[0], mmdd[1]) + datetime.timedelta(days=days)

        if weekday is not None:
            try:
                while out.weekday() != int(weekday):
                    out += datetime.timedelta(days=1)
            except:
                out = []

        return (out.month, out.day)

    # Calcular el Domingo de resurrecion, Semana Santa y sumarle dias
    def __holy_week(self, days=0, weekday=None):
        k = int(int(self.__date.year) / 100)
        q = int(k / 4)
        d = ((19 * (int(self.__date.year) % 19)) + ((15 - (int((13 + (8 * k)) / 25)) + k - q) % 30)) % 30
        e = ((2 * (int(self.__date.year) % 4)) + (4 * (int(self.__date.year) % 7)) + (6 * d) + ((4 + k - q) % 7)) % 7
        sun = datetime.datetime(int(self.__date.year), 3, 22 + d + e) if (d + e) < 10 else datetime.datetime(
            int(self.__date.year), 4, d + e - 9)

        out = sun + datetime.timedelta(days=days)

        if weekday is not None:
            try:
                while out.weekday() != int(weekday):
                    out += datetime.timedelta(days=1)
            except:
                out = []

        return (out.month, out.day)

    # Metodo para devolver los festivos de un año
    def __getDays(self):
        out = [(1, 1), (1, 6), (5, 1), (8, 15), (10, 12),  (11, 1), (12, 25), (12, 6), (12, 8), self.__holy_week(-2)]

        if self.__cp == 20:  # Gipuzkoa
            out = [(1, 1), (1, 6), (1, 20), (19, 3), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(1), (5, 1), (8, 15), (9, 9), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 15:  # A Coruña
            out = [(1, 1), (1, 6), (16, 2), (19, 3), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 17), (8, 15), (8, 24), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 2:  # Albacete
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 31), (6, 3), (6, 24), (8, 15), (9, 8), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 3:  # Alicante
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-2), self.__holy_week(1), self.__holy_week(11), (5, 1), (6, 24), (8, 15), (10, 9), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 4:  # Almería
            out = [(1, 1), (1, 6), (3, 1), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 24), (8, 15), (8, 16), self.__add_days((8, 1), 22, 5), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 1:  # Araba/Álava
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(1), (4, 28), (5, 1), (7, 25), (8, 5), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 33:  # Asturias
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (8, 16), (9, 8), (9, 21), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 6:  # Badajoz
            out = [(1, 1), (1, 6), (2, 16), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 24), (9, 8), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 8:  # Barcelona
            out = [(1, 1), (1, 6), self.__holy_week(-2), self.__holy_week(1), (5, 1), self.__holy_week(50), (6, 24), (9, 11), (9, 24), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 48:  # Bizkaia
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(1), (5, 1), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 9:  # Burgos
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (6, 29), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 39:  # Cantabria
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 28), (9, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 12:  # Castellón
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-28), self.__holy_week(-2), self.__holy_week(1), (5, 1), (6, 24), (6, 29), (8, 15), (10, 9), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 51:  # Ceuta
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 13), (8, 5), (8, 15), (9, 2), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 13:  # Ciudad Real
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), self.__holy_week(50), (5, 31), self.__holy_week(60), (8, 15), (8, 22), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 16:  # Cuenca
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 31), self.__holy_week(60), (6, 1), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 10:  # Cáceres
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (5, 31), (8, 15), (9, 9), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 11:  # Cádiz
            out = [(1, 1), (1, 6), self.__holy_week(-49), (2, 28), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (8, 15), (9, 7), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 14:  # Córdoba
            out = [(1, 1), (1, 6), (2, 28), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (8, 16), (9, 8), (10, 24), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 17:  # Girona
            out = [(1, 1), (1, 6), self.__holy_week(-2), self.__holy_week(1), (5, 1), (6, 24), (7, 25), (8, 15), (9, 11), (10, 29), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25), (12, 26)]
        elif self.__cp == 18:  # Granada
            out = [(1, 1), (1, 2), (1, 6), (3, 1), self.__holy_week(-3), self.__holy_week(-2), (5, 1),  self.__holy_week(60), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 19:  # Guadalajara
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 31), self.__holy_week(60), (9, 8), self.__add_days((9, 8), 4, 4), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 21:  # Huelva
            out = [(1, 1), (1, 6), (2, 28), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (8, 3), (8, 15), (9, 8), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 22:  # Huesca
            out = [(1, 1), (1, 6), (1, 22), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (8, 10), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 7:  # Illes Balears
            out = [(1, 1), (1, 6), (1, 20), (3, 1), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 24), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 23:  # Jaén
            out = [(1, 1), (1, 6), (3, 1), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 11), (8, 15), (10, 12), (11, 1), (25, 11), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 26:  # La Rioja
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(1), (5, 1), (6, 9), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 35:  # Las Palmas
            out = [(1, 1), (1, 6), self.__holy_week(-47), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 24), (8, 5), self.__add_days((8, 5), 7, 0), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 24:  # León
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (6, 24), (8, 5), (self.__add_days((8, 5), 6, 0) if (self.__add_days((8, 5), 6, 0)[1] > 15) else (8, 5)), (10, 4), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 25:  # Lleida
            out = [(1, 1), (1, 6), self.__holy_week(-2), self.__holy_week(1), (5, 1), (5, 11), (6, 24), (9, 11), (9, 29), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 27:  # Lugo
            out = [(1, 1), (1, 6), self.__holy_week(-47), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 17), (10, 5), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 28:  # Madrid
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 2), (5, 15), (8, 15), (10, 5), (10, 12), (11, 1), (11, 9), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 52:  # Melilla
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (9, 8), (9, 17), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 30:  # Murcia
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(2), (5, 1), (6, 9), (8, 15), self.__add_days((9, 1), 13, 1), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 29:  # Málaga
            out = [(1, 1), (1, 6), (2, 28), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (8, 15), (8, 19), (9, 8), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 31:  # Navarra
            out = [(1, 1), (1, 6), (3, 19), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(1), (5, 1), (8, 15), (10, 12), (11, 1), (11, 9), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 32:  # Ourense
            out = [(1, 1), (1, 6), self.__holy_week(-47), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 17), (6, 24), (7, 25), (8, 15), (10, 12), (11, 1), (11, 11), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 34:  # Palencia
            out = [(1, 1), (1, 6), (2, 2), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (8, 15), (9, 2), (10, 12), (11, 1), (11, 11), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 36:  # Pontevedra
            out = [(1, 1), (1, 6), self.__holy_week(-46), (3, 19), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 17), (7, 11), (7, 25), (8, 15), (10, 12), (11, 1), (11, 11), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 37:  # Salamanca
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(8), (4, 23), (5, 1), (6, 12), (8, 15), (9, 8), (10, 12), (11, 1), (11, 11), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 38:  # Santa Cruz de Tenerife
            out = [(1, 1), (1, 6), (2, 2), self.__holy_week(-47), self.__holy_week(-46), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (5, 30), (8, 15), (7, 7), (10, 12), (11, 1), (11, 11), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 40:  # Segovia
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (5, 1), (6, 29), (8, 15), (10, 12), (10, 25), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 41:  # Sevilla
            out = [(1, 1), (1, 6), (2, 28), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(17), (5, 1), self.__holy_week(60), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 42:  # Soria
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (6, 24), (8, 15), (10, 2), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 43:  # Tarragona
            out = [(1, 1), (1, 6), self.__holy_week(-2), self.__holy_week(1), (5, 1), (6, 24), (8, 15), (8, 19), (9, 11), (9, 23), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 44:  # Teruel
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(2), (4, 23), (5, 1), self.__add_days((7, 1), 7, 0), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 25)]
        elif self.__cp == 45:  # Toledo
            out = [(1, 1), (1, 6), (1, 23), (3, 19), self.__holy_week(-3), self.__holy_week(-2), self.__holy_week(1), (5, 1), self.__holy_week(60), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 9), (12, 25)]
        elif self.__cp == 46:  # Valencia
            out = [(1, 1), (1, 6), (1, 22), (3, 19), self.__holy_week(-2), self.__holy_week(1), self.__holy_week(8), (5, 1), (6, 24), (10, 9), (10, 12), (11, 1), (12, 6), (12, 8), (12, 9), (12, 25)]
        elif self.__cp == 47:  # Valladolid
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (5, 13), (8, 15), (9, 8), (10, 12), (11, 1), (12, 6), (12, 8), (12, 9), (12, 25)]
        elif self.__cp == 49:  # Zamora
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), self.__holy_week(49, 0), (6, 29), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 9), (12, 25)]
        elif self.__cp == 50:  # Zaragoza
            out = [(1, 1), (1, 6), (1, 29), (5, 5), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (8, 15), (10, 12), (11, 1), (12, 6), (12, 8), (12, 9), (12, 25)]
        elif self.__cp == 5:  # Ávila
            out = [(1, 1), (1, 6), self.__holy_week(-3), self.__holy_week(-2), (4, 23), (5, 1), (5, 2), (8, 15), (10, 12), (10, 15), (11, 1), (12, 6), (12, 8), (12, 9), (12, 25)]

        for i in range(len(out)):
            aux = datetime.datetime(int(self.__date.year), out[i][0], out[i][1])
            if int(aux.strftime("%w")) == 0:
                out[i] = (out[i][0], out[i][1] + 1)

        return out

    # Metodo que devuelve las lunas
    def __getMoon(self):
        out = []

        for i in range(12):
            date = ephem.Date(datetime.date(self.__year, (i + 1), 1))

            # Luna llena == 0
            aux_date = datetime.datetime.strptime(str(ephem.next_full_moon(date)), '%Y/%m/%d %H:%M:%S')
            out.append((aux_date.month, aux_date.day, 0))
            # Luna 1º Cuarto
            aux_date = datetime.datetime.strptime(str(ephem.next_first_quarter_moon(date)), '%Y/%m/%d %H:%M:%S')
            out.append((aux_date.month, aux_date.day, 0.25))
            # Luna 3º Cuarto
            aux_date = datetime.datetime.strptime(str(ephem.next_last_quarter_moon(date)), '%Y/%m/%d %H:%M:%S')
            out.append((aux_date.month, aux_date.day, 0.75))
            # Luna Nueva
            aux_date = datetime.datetime.strptime(str(ephem.next_new_moon(date)), '%Y/%m/%d %H:%M:%S')
            out.append((aux_date.month, aux_date.day, 1))

        return out

    # Metodo de escribe el objeto clase
    def __str__(self):
        return f'{self["year"]} in {self["cp"]}, {self["city"]} \n\t holidays --> {self["holidays"]}'

    # Metodo para indicarle un atributo
    def __setitem__(self, key, value):
        kwargs = {}
        kwargs[key] = value
        self.__init__(**kwargs)

    # Metodo para devolver un atributo
    def __getitem__(self, item):
        try:
            if item == "holidays":
                return self.__holidays
            elif item == "moon":
                return self.__moons
            elif item == "year":
                return self.__year
            elif item == "cp":
                return self.__cp
            elif item == "city":
                return list(i[1] for i in self.__cps if i[0] == self.__cp)[0]
            elif item == "cps":
                return self.__cps
            else:
                return None
        except:
            return None
