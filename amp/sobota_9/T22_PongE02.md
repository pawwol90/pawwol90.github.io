# Temat - Gra PONG

![screen](Grafiki/T22_screen01.png)

## Etap 2 - Obsługa klawiszy

Kolejnym krokiem jaki wykonamy to obsługa klawiszy. Poniżej w tabeli przedstawiono kolejne klawisze i ich akcje:


|Klawisz|Akcja|
|---|---|
|A|Ruch Gracza po lewej do góry|
|Z|Ruch Gracza po lewej w dół|
|Strzałka w górę|Ruch Gracza po prawej do góry|
|Strzałka w dół|Ruch Gracza po prawej do dół|
|SPACJA|Rozpoczęcie tury, jeżeli nie rozpoczęta|

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

#### Ruchy gracza po lewej  - działający kod

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