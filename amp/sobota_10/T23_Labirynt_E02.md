# Labirynt w konsoli - część 2

Na najbliższych zajęciach dokończymy aplikację, która pozwoli na granie w labirynt w konsoli.

## Jeżeli gra nie jest skończona - pozwól na ruch

Na ostatnich zajęciach napisaliśmy funkcję `CzyKoniec` zmienia ona naszą zmienną `koniec`. Kolejnym etapem będzie oczekiwanie na ruch gracza, ustalenie jego potencjalnej nowej pozycji i zmiana jeżeli ta owa nowa pozycja nie spowoduje, że gracz znajdzie się na ścianie. Obecnie sprawdziliśmy czy gracz jest na końcu jeżeli będzie on na końcu to nie chcemy wykonywać kolejnych kroków tylko zakończyć rozgrywkę. W tym celu sprawdzimy czy na pewno zmienna `koniec` ma w sobie wartość `false` co oznacza, że gracz jednak nie znajduje się w miejscu wyjścia z labiryntu i możemy pozwolić na prowadzenie rozgrywki.

Wewnątrz funkcji main, po linijce wywołującej funkcję `CzyKoniec` dodajmy takie sprawdzenie:

```csharp
if(!koniec)
{

}
```

Teraz możemy spokojnie wewnątrz powyższego IF'a czekać na ruch gracza i realizować dalszą logikę poruszania się gracza - wiemy że nie jest on przy wyjściu z labirytnu.

### Zadanie 1

Dodaj IF'a opisanego powyżej. If powinien znaleźć się w funkcji `Main` od razu pod linijką:

```csharp
koniec = CzyKoniec(mapa, pozycjaGraczaX, pozycjaGraczaY); // TA LINIJKA JUŻ ISTNIEJE ZNAJDŹ JĄ I DODAJ IF'a z opisu powyżej POD NIĄ!!!!
```

## Kierunki poruszania się

Zanim odczytamy jakikolwiek ruch od naszego gracza powinniśmy ustalić tzw. `klawiszologię`, czyli konfigurację klawiszy, która będzie odpowiadała za konkretne ruchy. W naszym przypadku możemy poruszać się w standardowych 4rech kierunkach:

1. Góra - W
2. Dół - S
3. Lewo - A
4. Prawo - D

Do każdego kierunku przypisane zostały litery, które odpowiadaja danym kierunkom na klawiaturze. Po wciśnięciu przycisku z daną literą gracz powinien udać się w wybranym kierunku.

Musimy jednak pamiętać, że użytkownikowi może omsknąć się ręka na klawiaturze, lub może celowo użyć innych klawiszy. Dla nas taki ruch gracza będziemy określać jako `Nieznany` kierunek. Zatem mamy 5 różnych kombinacji, moglibyśmy do nich przypisać cyfry - tak jak zostało to zrobione w przypadku kierunków, ale my znamy ciekawsza strukturę, czyli `enum` - pozwoli on nam na słowne określenie w kodzie w jakim kierunku idziemy. Nad funkcją main stwórzmy sobie enuma `Kierunek`:

```csharp
enum Kierunek
{
    Gora,
    Dol,
    Lewo,
    Prawo,
    Nieznany
}
```

Oprócz standardowych kierunków dodaliśmy owy niezdefiniowany kierunek, którym będziemy się posługiwali kiedy użytkownik wciśnie inny klawisz niż te, któe odpowiadają za poprawne kierunki.

### Zadanie 1

Dodaj do programu enuma reprezentującego 4 podstawowe kierunki: gora, dol, lewo i prawo a także dodatkowy `nieznany` stosowany w przypadku gdy użytkownik wciśnie jakiś inny klawisz.

## Oczekiwanie na ruch gracza

Możemy zatem stworzyć zmienną, która będzie przechowywała wybrany przez gracza kierunek. Na przykład

```csharp
Kierunek wybranyKierunek; //TO TYLKO PRZYKŁAD - nie kopiuj tego!!!!!!!!
```

Wybrany kierunek określimy przy pomocy wciśniętych przez użytkownika klawiszy. Zatem możemy stworzyć funkcję `CzekajNaRuch` a jej wynik przypisać do naszej zmiennej:

```csharp
Kierunek wybranyKierunek = CzekajNaRuch();
```

Funkcja ta nie przyjmuje żadnych danych - aby czekać na ruch użytkownika potrzebujemy jedynie sprawdzić jaki klawisz wcisnął w konsoli. Zatem funkcja nie potrzebuje żadnych parametrów wejściowych. Za to wartością wyjściową z funkcji będzie wartość z stworzonego przez nas enum'a `Kierunek` - wynik tej funkcji przypisujemy do zmiennej o takim typie danych (spójrz kod powyżej tego akapitu). Zatem możemy zdefiniować taką funkcję:

```csharp
static Kierunek CzekajNaRuch()
{

}
```

Funkcja powinna oczekiwać na wciśnięcie klawisza i reagować w 4 rech przypadkach konkretnymi wartościami a poza tym zwracać wartość `Kierunek.Nieznany`. Oczekujemy na klawisz tylko raz i sprawdzamy go dla 4rech przypadków - od razu nasuwa nam się konstrukcja `switch - case`, którą tu zastosujemy. Według ustaleń z poprzednich punktów dla konkretnych liter klawiatury wykonamy konkretne ruchy, zatem cała konstrukcja `switch-case` będzie następująca:

```csharp
switch(Console.ReadKey(true).Key)
{
    case ConsoleKey.W:
        return Kierunek.Gora;
    case ConsoleKey.A:
        return Kierunek.Lewo;
    case ConsoleKey.S:
        return Kierunek.Dol;
    case ConsoleKey.D:
        return Kierunek.Prawo;
    default:
        return Kierunek.Nieznany;
}
```

Jest ona jednocześnie całą zawartością funkcji `CzekajNaRuch`. Jak zauważyłeś sprawdzamy właściwość `Key` dla `ReadKey` a przy okazji uruchamiamy `ReadKey` z parametrem (`true`) - parametr ten pozwala na ukrycie w konsoli informacji o wciśniętym klawiszu - nie pojawiają sie symbole odpowiednie dla danego klawisza.

### Zadanie 2

Dodaj w głównym programie zmienną do któej `Kierunek wybranyKierunek` do której przypiszesz wynik nowo powstałej funkcji `CzekajNaRuch`. Funkcja ta powinna oczekiwać na wciśnięcie przez użytkownika klawisza na klawiaturze i zwrócić odpowiednią wartość dla klawiszy według tabeli:

| Klawisz      | Kierunek          |
| ------------ | ----------------- |
| W            | Kierunek.Gora     |
| A            | Kierunek.Lewo     |
| S            | Kierunek.Dol      |
| D            | Kierunek.Prawo    |
| Inny klawisz | Kierunek.Nieznany |

Postępując według opisu z punktu przed zadaniem uzyskasz dokładnie wspomniany efekt. Po uruchomieniu programu powinen on przestać migać i powinno dać się wciskać klawisze, ale na razie bez efektu.

## Obliczanie i ustalanie nowej pozycji gracza

Wróćmy do funkcji main, która powinna obecnie prezentować się w następujący sposób:

```csharp
public static void Main(string[] args)
{
char[,] mapa = {
    { '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' },
    { '#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#' },
    { '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', '#' },
    { '#', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#' },
    { '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#' },
    { '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#' },
    { '#', ' ', '#', '#', '#', '#', ' ', '#', '#', '#' },
    { '#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#' },
    { '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#' },
    { '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', '#' },
    { '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' }
};
  int pozycjaGraczaX = 1, pozycjaGraczaY = 1;
  bool koniec = false;
  while(!koniec)
  {
    Rysuj(mapa, pozycjaGraczaX, pozycjaGraczaY);
    koniec = CzyKoniec(mapa, pozycjaGraczaX, pozycjaGraczaY);
    if(!koniec)
    {
      Kierunek wybranyKierunek = CzekajNaRuch();
    }
  }
}
```

W miejscu gdzie mamy zmienną `wybranyKierunek` ustalamy jej wartość na podstawie funkcji `CzekajNaRuch`. Jej wartość to może być jakiś konkretny kierunek albo nasz domyślny `Nieznany`. Gracz powinien jednak wykonać ruch kiedy wybrany przez użytkownika kierunek jest `znany`, czyli `nie jest nieznany`. Zatem powinniśmy to sprawdzić zanim dokonamy ruchu użytkownika:

```csharp
if(wybranyKierunek != Kierunek.Nieznany)
{

}
```

Teraz wewnątrz tej instrukcji IF możemy założyć że zmienna `wybranyKierunek` ma jedną z 4rech wartośći:

1. Kierunek.Gora
2. Kierunek.Dol
3. Kierunek.Lewo
4. Kierunek.Prawo

Aby przesunąć gracza w wybranym kierunku musimy obliczyć jego nową pozycję na osi X i Y naszego ekranu. W tym celu musimy stworzyć dwie funkcje, pierwsza, która na podstawie wybranego przez gracza kierunku określi nową pozycję na osi X a druga która określi dokładnie to samo dla osi Y.

Jako, że nasza pozycja gracza to zmienna typu `int` nowe funkcje powinny również zwracać takie wartości. W celu ustalenia nowej pozycji musmy znać kierunek w jakim udał się gracz oraz aktualną pozycję - to w końcu ją zmieniamy.

Stówrzmy zatem dwie funkcje o podobnych nazwach i identycznych parametrach:

```csharp
static int ObliczNowaPozycjeGraczaX(Kierunek wybrany, int x)
{

}
```

```csharp
static int ObliczNowaPozycjeGraczaY(Kierunek wybrany, int y)
{

}
```

Względem osi X użytkownik może poruszać się tylko w dwuch kierunkach: w prawo lub w lewo. Zatem w funkcji `ObliczNowaPozycjeGraczaX` powinniśmy sprawdzić czy gracz idzie tylko w tych dwóch kierunkach. Znowu przychodzi nam na myśl switch:

```csharp
switch(wybrany)
{
    case Kierunek.Lewo:

    case Kierunek.Prawo:

    default:

}
```

Jeżeli użytkownik nie będzie szedł ani w lewo ani w prawo to względem osi X nie wykona żadnego ruchu, zatem dla `default` możemy zwrócić tą samą pozycję:

```csharp
switch(wybrany)
{
    case Kierunek.Lewo:

    case Kierunek.Prawo:

    default:
        return x;
}
```

Idąc w prawo odległość od lewej krawędzi dla gracza będzie sie zwiekszać, za każdym razem o 1 znak, zatem:

```csharp
switch(wybrany)
{
    case Kierunek.Lewo:

    case Kierunek.Prawo:
        return x++;
    default:
        return x;
}
```

Idąc w lewo odległość od lewej krawędzi dla gracza będzie sie zmniejszać, za każdym razem o 1 znak, zatem:

```csharp
switch(wybrany)
{
    case Kierunek.Lewo:
        return x--;
    case Kierunek.Prawo:
        return x++;
    default:
        return x;
}
```

Teraz przejdźmy do funkcji `ObliczNowaPozycjeGraczaY`. Tutaj użytkownik porusza się wzdłuż osi Y, wiec może iść albo w góre albo w dół. Zatem wewnątrz wspomnianej funkcji powstanie znów switch:

```csharp
switch(wybrany)
{
    case Kierunek.Gora:

    case Kierunek.Dol:

    default:

}
```

Jeśli gracz nie wybierze przycisku symbolizującego kierunek w góre lub w dół względem osi Y powienien zostać w tym samym miejscu. Zatem dla `default` znów:

```csharp
switch(wybrany)
{
    case Kierunek.Gora:

    case Kierunek.Dol:

    default:
        return y;
}
```

Idąc w dół, oddala się od górnej krawędzi po 1 znaku, zatem:

```csharp
switch(wybrany)
{
    case Kierunek.Gora:

    case Kierunek.Dol:
        return y + 1;
    default:
        return y;
}
```

No i idąc w górę zbliżamy się do górnej krawędzi konsoli, zatem odległość od niej sie zmniejsza:

```csharp
switch(wybrany)
{
    case Kierunek.Gora:
        return y - 1;
    case Kierunek.Dol:
        return y + 1;
    default:
        return y;
}
```

Ograniczyliśmy w koło planszę przez ściany, zatem wypadałoby przed wprawieniem w ruch gracza sprawdzić czy nie chciał on przypadkiem wejść na którąkolwiek ścianę. Zatem powinniśmy tymczasowo zapisać nowo ustaloną pozycję gracza, a następnie sprawdzić czy w tym miejscu nie ma ściany i ustawić tą pozycję jako aktualna.

W tym celu wrócimy do funkcji main i stworzymy dwie zmienne wewnątrz nowego IF'a (tego który sprawdza czy wybrany kierunek nie jest nieznanym kierunkiem). Będą to: `nowaPozycjaGraczaX` oraz `nowaPozycjaGraczaY` ich typ powinien być zgodny z zmiennymi `pozycjaGraczaX` i `pozycjaGraczaY`, ponieważ na dalszym etapie będziemy je przyrównywać do tych zmiennych. Wartości zmiennych `nowaPozycjaGraczaX` i `nowaPozycjaGraczaY` powinny być ustalane przy pomocy nowo powstałych funkcji, zatem:

```csharp
int nowaPozycjaGraczaX = ObliczNowaPozycjeGraczaX(wybranyKierunek, pozycjaGraczaX);
int nowaPozycjaGraczaY = ObliczNowaPozycjeGraczaY(wybranyKierunek, pozycjaGraczaY);
```

Jak widać nowa pozycja ustalana jest na podstawie obecnej pozycji.

## Zadanie 3

W głónym programie sprawdź czy obrany przez gracza kierunek jest znanym dla nas kierunkiem, a następnie dodaj dwie zmienne `nowaPozycjaGraczaX` i `nowaPozycjaGraczaY` a następnie ustaw ich wartość przy pomocy funkcji `ObliczNowaPozycjeGraczaX` i `ObliczNowaPozycjeGraczaY` do których przekażesz informacje o wybranym kierunku a także aktualnej pozycji gracza. Funkcje powinny sprawdzać w jakim kierunku chce udać się gracz i odpowiednio przeliczyć współrzędne tak, aby wyznaczyć nową pozycję gracza na planszy. Przeczytaj zamieszczony powyżej opis, który przeprowadzi Cię przez ten proces.

## Sprawdzamy czy użytkownik wszedł na ścianę

Mamy obecnie dwie pozycje w pamięci aktualną, tą którą widzi użytkownik oraz nową obliczoną na podstawie wybranego przez użytkownika kierunku. Musimy uchronić jeszcze użytkownika przed jednym zagrożeniem: wejście w ścianę. Powinniśmy sprawdzić czy nowa, obliczona pozycja nie spowoduje, że gracz znajdzie się na ścianie, co jest dla nas nieakceptowalne.

Stwórzmy ostatnią funkcję, która zwróci nam informacje na podstawie nowych współrzędnych gracza czy są one na ścianie na naszej mapie. Funkcja `CzySciana` powinna zwrócić wartość `true` lub `false` w zależności od tego czy nowa pozycja będzie na ścianie czy nie. Aby to ustalić potrzebujemy oprócz nowej pozycji gracza również mapę, na której sprawdzimy dane. Zatem definicja funkcji:

```csharp
static bool CzySciana(char[,] mapa, int x, int y)
{

}
```

Funkcja powinna być identyczna jak funcka `CzyKoniec` z tym, że sprawdzać symbol ściany, zatem zawartość funkcji powinna być następująca:

```csharp
if(mapa[y, x] == '#')
{
    return true;
}
return false;
```

### Zadanie 4

Napisz funkcję `CzySciana`, która sprawdzi na zadanej do funkcji mapie czy na zadanych do funkcji współrzędnych `x` i `y` znajduje się ściana.

## Ustawiamy aktualną pozycje gracza

Ostatnie co musimy zrobić to wywołać funkcję i jeżeli gracz nie jest na ścianie to zapisać jego nową pozycję, czym wprawimy go w ruch. Zatem pod nowo powstałymi zmiennymi `nowaPozycjaGraczaX` i `nowaPozycjaGraczaY` wstawmy poniższy kod:

```csharp
if(!CzySciana(mapa, nowaPozycjaGraczaX, nowaPozycjaGraczaY))
{
    pozycjaGraczaX = nowaPozycjaGraczaX;
    pozycjaGraczaY = nowaPozycjaGraczaY;
}
```

### Zadanie 5

Dodaj odpowiednie wywoałnie i sprawdzenie wyniku funkcji `CzySciana`. Jeżeli nowa pozycja gracza to nie jest sciana wpisz wartości `nowaPozycjaGraczaX` i `nowaPozycjaGraczaY` do zmiennych `pozycjaGraczaX` i `pozycjaGraczaY`.

To już ostatnie zadanie. Po tym zadaniu powinieneś mieć w pełni funkcjonalny labirynt. Teraz możesz dokonać modyfikacji samej mapy. Pamiętaj jednak, aby nie likwodować ścian okalających labirynt i wstawić gdzieś wyjście z labiruntu. Pierwszy przypadek może skrajnie powodować błędy a drugi spowoduje że gra będzie trwała bez końca.

## Zadanie 6\* - dla chętnych

Spróbuj zmodyfikować program tak, aby zliczał liczbę ruchów wykonanych przez gracza w celu wyjścia z labiryntu. Wyświetlaj je po zakonczeniu rozgrywki.

## Zadanie 7\* - dla chetnych

Stwórz planszę końcową, któa się wyświetli po zakończeniu gry - jeżeli wkonasz Zadanie 6 to dodaj na tej planszy informację o wyniku gracza

## Wyślij rozwiazania

Przygotuj kod źródłowy programu powstałego w trakcie realizacji ćwiczeń do wysyłki na podstawie [instrukcji](../ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej)

Adres do wysyłki: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat Maila: `Labirynt CZ. 2`.
