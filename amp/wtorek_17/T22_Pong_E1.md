# Gra PONG

![screen](Grafiki/T22_screen01.png)

## Przygotowanie okna gry

Na początek przygotuj projekt okna - stwórz nowy projekt aplikacji windows, a następnie:

1. Ustaw właściwości okna:
   1. `Text` (tytuł) = Pong
   2. `AutoScaleMode` = None
   3. `MaximumSize` = 800, 600
   4. `MinimumSize` = 800, 600
   5. `Size` = 800, 600
   6. `MaximizeBox` = false
   7. `MinimizeBox` = false
   8. `ShowIcon` = false
2. Dodaj do okna kontrolkę panel, który stanie się tłem naszej rozgrywki, ustaw jej właściwości:
   1. `(Name)` = background
   2. `Dock` = Fill - środkowy prostokąt
3. Dodaj do okna pole tekstowe (kontrolka typu: `Label`), które posłuży do wyświetlania wyniku. Następnie skonfiguruj jego właściwości:
   1. `Text` = "0 : 0"
   2. `TextAlign` = MiddleCenter - środkowy prostokąt
   3. `(Name)` = talicaWynikow
   4. `Dock` = Top - górny prostokąt
4. Dodaj do projektu plik z zasobami (resource: Project -> Add -> New Item... -> Misc (po lewej) -> Empty Resource File)

   1. Do otwartego pliku zasobów załaduj obrazek piłki [stąd](Grafiki/T22_pilka.png):

   ![piłka](Grafiki/T22_pilka.png)

   2. Zapisz plik i zamknij jego edycję

5. Dodaj do okna kontrolkę PictureBox - ustaw ją mniej/więcej na środku. Ustaw właściwości kontrolki:
   1. `BackColor` = Transparent (Web -> Transparent - na samej górze)
   2. `Image` - Wybierz załadowaną do resources grafikę piłki.
   3. `SizeMode` = StretchImage
   4. `(Name)` = pilka
   5. `Size` = 30, 30
6. Dodaj do okna kolejny panel i ustaw jego właściwości:
   1. `BackColor` = Black
   2. `(Name)` = gL - jak gracz lewy (ten po lewej stronie)
   3. `Location` = 0, 0
   4. `Size` = 15, 100
   5. Ustaw kontrolkę w lewym górnym rogu
7. Skopiuj własnie utworzony i skonfigurowany panel:
   1. Zaznacz panel
   2. ctrl+c
   3. ctrl+v
   4. Ustaw właściwość: `(Name)` = gP - jak gracz prawy (ten po prawej stronie)
   5. Ustaw kontrolkę po prawej na dole
8. Dodaj do okna timer. Skonfiguruj go:
   1. `(Name)` = gra
   2. `Interval` = 40 - **Wyjaśnienie:** 1sek = 1000ms, aby ruch piłki sprawiał wrażenie płynnego w ciągu sekundy musi zmienić się jej pozycja na ekranie minimum 24razy. 1000/24=41.(6), a wartość 40 to 25 klatek.

## Etap 1: Ustawmy wszystko poprawnie na ekranie

Kliknij dwukrotnie na pasek tytułu okna. Do kodu doda się funkcja obsługująca zdarzenie `MainFormLoad` - funkcja posłuży nam do ustawienia wszystkich elementów dokładnie w pozycji startowej.

Wewnątrz funkcji dodaj poniższy kod:

```csharp
ResetPilki();
ResetGraczy();
```

### Funkcja: ResetPilki

Funkcja powinna ustawić piłkę na środku ekranu - w tym calu użyjemy rozmiaru panelu `background`, który został stworzony na pierwszym etapie. Nie możemy użyć rozmiaru samego okna, ponieważ uwzględnia on wymiary pozostałych elementów (paska tytułowego, obramowania itp).

Piłka powinna znaleźć się dokładnie na środku ekranu. W celu wyznaczenia środka pola po którym porusza się piłka należy podzielić jego wysokość i szerokość przez 2.

```csharp
int x = (background.Size.Width / 2);
int y = (background.Size.Width / 2);
```

Zakładając że Width i Height ma 500px to powyższe obliczenia dadzą nam wartość `250`. Ustawiając wartość Location dla piłki dokładnie w tym miejscu spowodujemy, że lewy górny róg piłki znajdzie się dokładnie w środku.

Chcemy, aby to środek piłki był na środku obszaru rozgrywki. W tym celu musimy przesunąć lewy górny róg piłki w lewo i w górę o połowę wysokości i szerokości piłki.

Zmodyfikujmy powyżej przedstawiony kod tak aby punkty X i Y przedstawiały realną lokalizację lewego górnego rogu piłki uwzględniając chęć umieszczenia środka piłki w środku obszaru rozgrywki:

```csharp
int x = (background.Size.Width / 2) - (pilka.Size.Width / 2);
int y = (background.Size.Width / 2) - (pilka.Size.Width / 2);
```

Następnie ustawmy poprawnie jej lokalizację:

```csharp
pilka.Location = new Point(x, y);
```

Cała funkcja powinna prezentować się w poniższy sposób:

```csharp
void ResetPilki()
{
	int x = (background.Size.Width / 2) - (pilka.Size.Width / 2);
	int y = (background.Size.Height / 2) - (pilka.Size.Height / 2);
	pilka.Location = new Point(x, y);
}
```

### Funkcja ResetGraczy

Gracze są rozstawieni po bokach ekranu. Po uruchomieniu gry chcemy ustawić graczy tak, aby znajdowali się dokładnie na środku wysokości ekranu przy swoich bokach.

#### Gracz po lewej stronie

Lewy górny róg (Lacation) gracza znajduje się na osi X dokładnie na wartości 0 i się nie zmienia - gracz względm osi X jest cały czas w jednym miejscu. Natomiast pozycja na osi X to połowa wysokości obszaru gry. Należy tu również uwzględnić, że mówimy o lewym górnym rogu kontrolki, więc rzeczywista lokalizacja będzie wyżej na ekranie dokładnie o połowę wysokości paletki gracza. Zatem:

```csharp
gL.Location = new Point(0, (background.Size.Height / 2) - (gL.Size.Height / 2));
```

#### Gracz po prawej stronie

Gracz po prawej stronie, jeśli chodzi o lokalizacji względem osi Y powinien być w tym samym miejscu. Czyli: `background.Size.Width - gP.Size.Width`

Natomiast na osi X nie będzie już maksymalnie przy lewej krawędzi (nie będzie to 0 tak jak w przypadku gracza po lewej stronie ekranu), lecz przy prawej. Współrzędne prawej krawędzi na osi X to szorokość okna pomniejszona o szerokość "paletki", czyli: `(background.Size.Height / 2) - (gP.Size.Height / 2)`

Tym samym domyślna lokalizacja gracza po prawej stronie to:

```csharp
gP.Location = new Point(background.Size.Width - gP.Size.Width, (background.Size.Height / 2) - (gP.Size.Height / 2));
```

### Kompletna funkcja

Cała funkcja powinna jednocześnie ustawiać lokalizacje obu graczy. Będzie ona wyglądała w poniższy sposób:

```csharp
void ResetGraczy()
{
	gL.Location = new Point(0, (background.Size.Height / 2) - (gL.Size.Height / 2));
	gP.Location = new Point(background.Size.Width - gP.Size.Width, (background.Size.Height / 2) - (gP.Size.Height / 2));
}
```

### Koniec pierwszego etapu

W tym momencie po uruchomieniu programu mamy ustawione paletki graczy po swoich stronach na środku względem boków widoku oraz piłkę dokładnie na środku.

## Etap 2 - Obsługa klawiszy

Kolejnym krokiem jaki wykonamy to obsługa klawiszy. Poniżej w tabeli przedstawiono kolejne klawisze i ich akcje:

| Klawisz         | Akcja                                   |
| --------------- | --------------------------------------- |
| A               | Ruch Gracza po lewej do góry            |
| Z               | Ruch Gracza po lewej w dół              |
| Strzałka w górę | Ruch Gracza po prawej do góry           |
| Strzałka w dół  | Ruch Gracza po prawej do dół            |
| SPACJA          | Rozpoczęcie tury, jeżeli nie rozpoczęta |

### Zdarzenie do obsługi klawiszy

W zakładce design zaznacz okno kliknięciem na pasek tytułu (RAZ). W zakładce `Properties` przejdź do zdarzeń (Ikonka pioruna na górze) i znajdź funkcję `KeyUp`, kliknij dwukrotnie, aby wegenerować ją w kodzie.

Powinna powstać poniższa funkcja:

```csharp
void MainFormKeyUp(object sender, KeyEventArgs e)
{

}
```

Funkcja ta ma za zadanie sprawdzić jaki klawisz został wciśnięty przez użytkownika. W tym celu wykorzystuje się jeden z parametrów funkcji: `KeyEventArgs e`. Parametr udostępnia właściwość `KeyCode`, która reprezentuje element z enuma `Keys`, który zawiera listę wszystkich klawiszy klawiatury.

Chcąc sprawdzić jeden parametr (`e.KeyCode`) pod kątem kilku różnych wartości od razu na myśl przychodzi konstrukcja switch-case, a zatem:

```csharp
switch (e.KeyCode)
{
	case Keys.Z:

		break;
	case Keys.A:

		break;
	case Keys.Down:

		break;
	case Keys.Up:

		break;
	case Keys.Space:

		break;
}
```

Sprawdzamy tylko i wyłącznie te klawisze, które obsługujemy - pozostałe nas nie intersują.

#### Start gry - SPACJA

Zacznijmy od końca. Jeżeli gra nie jest rozpoczeta (timer nie działa, jego właściwość `Enabled` ma wartość `false`) to należy go uruchomić. Kod dla spacji będzie wyglądał w poniższy sposób:

```csharp
if (!gra.Enabled)
{
	gra.Start();
}
```

#### Ruchy gracza

Ruch gracza to nic innego jak zmiana jego lokalizacji, tak jak względem osi X gracz nie zmienia swojej pozycji tak względem osi Y powinien ją zmieniać w zależności od przycisniętego klawisza. Na początek jednak swtwórzmy sobie dwie zmienne globalne (poza funkcją obsługująca klawisze), które będą informacją o prędkości naszych graczy:

```csharp
int predkoscL = 15;
int predkoscP = 15;
```

#### Ruch gracza po lewej stornie

Następnie przejdźmy do samej góry i obsługi liter `A` oraz `Z`. Litery służą do sterowania paletką gracza po lewej stronie. Zatem akcja dla litery `A` będzie zmieniała lokalizację ku górze, a dla litery `B` ku dołowi.

Należy pamiętać, że im wyżej idzie paletka tym jesteśmy bliżej do 0 na osi Y.

Litera `A` przenosi nam użytkownika do góry (bliżej 0), więc:

```csharp
gL.Location = new Point(gL.Location.X, gL.Location.Y - predkoscL);
```

Litera `Z` przenosi nam użytkownika do dołu, zatem:

```csharp
gL.Location = new Point(gL.Location.X, gL.Location.Y + predkoscL);
```

Po uruchomieniu gracz po lewej może się poruszać, ale wychodzi poza obszar gry.

#### Ruch gracza po lewej stornie - zabezpieczenia

Dla przycisku z literą `A` po zmianie lokalizacji należy sprawdzić czy jej lokalizacja względem osi Y nie jest mniejsza od 0 (wtedy wychodzi poza ekran do góry), jeżeli tak jest to ustawmy jej po prostu 0, aby cały czas była widoczna. Zatem do istniejącej obsługli wciśniętej litery A dodaj:

```csharp
if(gL.Location.Y < 0)
{
	gL.Location = new Point(gL.Location.X, 0);
}
```

Po uruchomieniu gracz już nie powinien wychodzić poza ekran idąc do góry.

Teraz w dół. Dla przycisku z literą `B` maksymalna lokalizacja widoczna na ekranie to wysokość naszego obszaru gry (kontrolka: `background`). Pamiętając jednak, że lokalizacja kontrolki to jej lewy górny róg należy to uwzględnić przy sprawdzaniu czy paleta nie wyjedzie poza ekran jadąc w dół. Zatem do lokalizacji paletki gracza należy dodać jej wysokość i sprawdzić czy nie jest ona wieksza od wysokości obszaru gry:

```csharp
if(gL.Location.Y + gL.Size.Height > background.Size.Height)
{
	gL.Location = new Point(gL.Location.X, backgroundSize.Height - gL.Size.Height);
}
```

W ten sposób zabezpieczyliśmy ruch gracza po lewej stronie - po uruchomieniu gracz powinien mieć możliwość poruszania się w góre i w dół ale tylko w granicach widocznego obszaru gry.

#### Ruchy gracza po lewej - działający kod

```csharp
switch (e.KeyCode)
{
	case Keys.Z:
		gL.Location = new Point(gL.Location.X, gL.Location.Y + predkoscL);
		if(gL.Location.Y + gL.Size.Height > background.Size.Height)
		{
			gL.Location = new Point(gL.Location.X, background.Size.Height - gL.Size.Height);
		}
		break;
	case Keys.A:
		gL.Location = new Point(gL.Location.X, gL.Location.Y - predkoscL);
		if(gL.Location.Y < 0)
		{
			gL.Location = new Point(gL.Location.X, 0);
		}
		break;
	case Keys.Down:

		break;
	case Keys.Up:

		break;
	case Keys.Space:
		if (!gra.Enabled)
		{
			gra.Start();
		}
		break;
}
```

#### Ruch gracza po prawej stornie

Gracz po prawej rządzi się tymi samymi prawami co gracz po lewej, zatem można swobodnie przenieść implementację kodu z litery `A` do przycisku `Up` (w górę), a także z litery `Z` do przycisku `Down` (w dół).

Należy podmienić jedynie kontrolkę gracza po lewej stronie `gL` na kontrolkę gracza po prawej stronie `gP` a także prędkość gracza `predkoscL` na `predkoscP`.

#### Kompletna implementacja obsługi klawiszy

Po wcześniejszych krokach powinieneś mieć stworzoną kompletną obsługę klawiszy wewnątrz funkcji `MainFormKeyUp`:

```csharp
switch (e.KeyCode)
{
	case Keys.Z:
		gL.Location = new Point(gL.Location.X, gL.Location.Y predkoscL);
		if(gL.Location.Y + gL.Size.Height > background.SizeHeight)
		{
			gL.Location = new Point(gL.Location.X, backgroundSize.Height - gL.Size.Height);
		}
		break;
	case Keys.A:
		gL.Location = new Point(gL.Location.X, gL.Location.Y predkoscL);
		if(gL.Location.Y < 0)
		{
			gL.Location = new Point(gL.Location.X, 0);
		}
		break;
	case Keys.Down:
		gP.Location = new Point(gP.Location.X, gP.Location.Y predkoscP);
		if(gP.Location.Y + gP.Size.Height > background.SizeHeight)
		{
			gP.Location = new Point(gP.Location.X, backgroundSize.Height - gP.Size.Height);
		}
		break;
	case Keys.Up:
		gP.Location = new Point(gP.Location.X, gP.Location.Y predkoscP);
		if(gP.Location.Y < 0)
		{
			gP.Location = new Point(gP.Location.X, 0);
		}
		break;
	case Keys.Space:
		if (!gra.Enabled)
		{
			gra.Start();
		}
		break;
}
```

### Koniec etapu drugiego

Na tym etapie posiadamy zainicjalizowaną grę oraz poprawny ruch graczy po bokach planszy.

## Wyślij zadanie

W celu zaliczenia obecności wyśli projekt aplikacji powstałej w ramach zajęć. W tym celu użyj opisu [stąd](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-okienkowej).

W tytule maila proszę podaj: `Zajęcia Zdalne - Gra Pong - Część 1 i 2`.
