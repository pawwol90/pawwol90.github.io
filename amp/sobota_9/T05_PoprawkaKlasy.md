# Temat 05 - Poprawka zadania testowego

Na tych zajęciach dokonamy przeglądu krok po kroku zadania z testu oraz zaimplementujemy je, tak jak powinno ono wyglądać docelowo.

## Stworzenie klasy pojazd

Mieliśmy za zadanie stworzyć aplikacje konsolową, a w niej klasę `Pojazd`, która powinna zawierać 3 pola:

1. Marka - jest wyrażana za pomocą tekstu, zatem typ danych `string`
2. Model - jest wyrażana za pomocą tekstu, zatem typ danych `string`
3. Prędkość Maksymalna - jest wyrażana liczbowo `double`

### Ćwiczenie 1

Stwórz projekt aplikacji konsolowej o nazwie `Zadanie poprawkowe` a następnie w projekcie dodaj plik z klasą o nazwie `Pojazd` i wewnątrz swórz trzy pola

```csharp
public string Marka;
public string Model;
public int PredkoscMaksymalna
```

## Stworzenie konstruktora klasy

Kolejnym krokiem było stworzenie konstruktora z parametrami, które ustawią wartości w polach naszej klasy.

W klasie jest już stworzony konstruktor bez parametrów, który wygląda następująco:

```csharp
public Pojazd()
{

}
```

Należało go jedynie zmodyfikować, w `()` wstawić parametry, najlepiej z nazwami różniącymi się od nazw pól (tutaj dobrą praktyką było po prostu zacząć od małej listery). Parametry w `()` powinny zatem być następujące:

```csharp
public Pojazd(string marka, string model, double predkoscMaksymalna)
```

Następnym krokiem była modyfikcja wnętrza konstruktora, czyli tego fragmentu, który znajduje się między klamrami `{}` przez przepisanie tego co użytkownik naszej klasy poda jako parametr do naszych pól:

```csharp
{
    Marka = marka;
    Model = model;
    PredkoscMaksymalna = predkoscMaksymalna;
}
```

### Ćwiczenie 2

Na podstawie powyższego opisu zmień odpowiednio kostruktor aby przyjmował 3 parametry i zapisywał za ich pomocą wartości do pól klasy stworzonych w ćwiczeniu 1.

## Metoda klasy `Pojazd`

Obecnie klasa powinna wyglądać następująco:

```csharp
public class Pojazd
{
    public string Marka;
    public string Model;
    public double PredkoscMaksymalna;

    public Pojazd(string marka, string model, double predkoscMaksymalna)
    {
        Marka = marka;
        Model = model;
        PredkoscMaksymalna = predkoscMaksymalna;
    }
}
```

Kolejne zadanie polegało na dodaniu metody do klasy `Pojazd`. Metoda miała obliczyć i zwrócić w miejscu jej wyołania czas przejazdu na podstawie podanej drogi do metody. Aby abliczyć czas przejazdu na podstawie zadanej drogi brakuje nam prędkości, ale w zadaniu była informacja że droga ma obliczyć się na podstawie `Predkosci Maksymalnej`, która jest polem naszej klasy. Jak dobrze wiemy pola klas możemy wykorzystać w metodach, ponieważ każda z metod jest wywoływana w ramach danego obiektu klasy.

Zacznijmy jednak od początku. Metoda powinna zwrócić w mojejscu jej wywołania czas w postaci liczby typu `double`, a metoda powinna nosić nazwę `CzasPrzejazduZPredkosciaMaksymalna` a także dostać informacje o drodze jako jej parametr, zatem definicja funkcji:

```csharp
public double CzasPrzejazduZPredkosciaMaksymalna(double odleglosc)
```

Następnie wewnątrz funkcji wykonujemy obliczenia. Obliczenia na podstawie wzoru:

`czas = droga / predkosc`

Metoda ma zwrócić wartość `double`, wiec musimy stworzyć zmienną `czas` o takim typie - to ją będziemy zwracali z metody. Droga z wzoru to nasz parametr funkcji (odleglosc), natomiast predkość maksymalna dla danego pojazdu jest znana i jest jego polem: `PredkoscMaksymalna`. Zatem całe obliczenia zmieszczą sie w poniższej linijce:

```csharp
double czas = odleglosc / PredkoscMaksymalna;
```

Metoda ma zwrócić wartość czasu, wiec pozostaje nam użyć `reutrn`:

```csharp
return czas;
```

### Ćwiczenie 3

Na podstawie powyższego opisu stwórz w klasie `Pojazd` metodę: `CzasPrzejazduZPredkosciaMaksymalna`.

## Głowna logika programu

Program w założeniu mial pobrać dane dla 5ciu pojazdów: Marke, Model, VMax. Następnie miał poprosić o drogę jaką przejadą wszystkie pojazdy. Ostatnim etapem było wykonanie obliczeń dla każdego pojazdy na liście za pomocą metody `CzasPrzejazduZPredkosciaMaksymalna` z zadaną tą samą drogą dla wszystkich pojazdów oraz wyświetlenie informacji o tym z jakim czasem dany pojazd przejedzie wybraną przez użytkownika drogę.

Obecnie mamy stworzoną kompletną definicję obiektu `Pojazd`, która powinna wyglądać następująco.

```csharp
public class Pojazd
{
    public string Marka;
    public string Model;
    public double PredkoscMaksymalna;
    public Pojazd(string marka, string model, double predkoscMaksymalna)
    {
        Marka = marka;
        Model = model;
        PredkoscMaksymalna = predkoscMaksymalna;
    }
    public double CzasPrzejazduZPredkosciaMaksymalna(double odleglosc)
    {
        double czas = odleglosc / PredkoscMaksymalna;
        return czas;
    }
}
```

Zwróć uwagę, że metoda `CzasPrzejazduZPredkosciaMaksymalna` przyjmuje tylko jeden parametr.

## Tworzenie listy pojazdów

Kolejny etap to stworzenie głównego programu, który miał za zadanie stworzenie listy z obiektami Pojazdów. Tą część należało wykonać w pliku `Program.cs`.

Aby używać list należy dodać do bloku `using`:

```csharp
using System.Collections.Generic;
```

Następnie w funkcji `Main` możemy dodać pustą listę o nazwie `pojazdy`:

```csharp
List<Pojazd> pojazdy = new List<Pojazdy>();
```

### Ćwiczenie 4

Otwórz plik `Program.cs` (już istnieje w projekcie). Dodaj do niego w bloku `using` możliwość korzystania z list a następnie stwórz listę o typie `Pojazdy`.

## Uzupełnianie listy

Kolejnym etapem było uzupełnienie listy pojazdów. Powinno ich być 5, zatem od razu nasuwa się operacja wykonana w pętli. Pojazdów chcemy zadać 5 zatem:

```csharp
for(int i=0; i < 5; i++)
{

}
```

Aby stworzyć obiekt klasy Pojazd` musimy wywołać konstruktor, który przyjmuje 3 parametry - potrzebuje ich do zainicjowania pól klasy, są to następujące parametry:

1. Marka - string
2. Model - string
3. Prędkość maksymalna - double

Najpiew musimy zapytać o powyższe dane i zapisać je do zmiennych tymczasowych, które użyjemy potem jako parametry konstruktora. Chcąc użyć tych zmiennych jako parametry konstruktora ich typy danych muszą być identyczne z tym czego wymaga konstruktor. Zatem zapytajmy wewnątrz wcześniej stworzonej pętli o powyższe dane:

```csharp
Console.Write("Podaj Markę: ");
string marka = Console.ReadLine();
Console.Write("Podaj Model: ");
string model = Console.ReadLine();
Console.Write("Podaj V-max: ");
double vmax = double.Parse(Console.ReadLine());
```

Ostatnim etapem w pętli będzie stworzenie nowego obiektu pojazdu na podstawie danych, które pobraliśmy od użytkownika i dodanie go do listy. Najpierw stwórzmy obiekt pojazdu. Użyjemy tutaj stworzonych zmiennych jako parametry pojazdu:

```csharp
Pojazd nowyPojazd = new Pojazd(marka, model, vmax);
```

Następnie dodajmy go do listy:

```csharp
pojazdy.Add(nowyPojazd);
```

### Ćwiczenie 5

Uzupełnij pętle na podstawie powyższego opisu tak, aby:

1. Pobrała dane o pojeździe (Markę, Model, Prędkość maks).
2. Stworzyła obiekt pojazdu.
3. Dodała stworzony obiekt do listy.

## Odległość do przejechania

Funkcja `Main` powinna akutalnie wyglądać następująco:

```csharp
List<Pojazd> pojazdy = new List<Pojazd>();

for (int i = 0; i < 5; i++)
{
    Console.Write("Podaj Markę: ");
    string marka = Console.ReadLine();
    Console.Write("Podaj Model: ");
    string model = Console.ReadLine();
    Console.Write("Podaj V-max: ");
    double vmax = double.Parse(Console.ReadLine());
    Pojazd nowyPojazd = new Pojazd(marka, model, vmax);
    pojazdy.Add(nowyPojazd);
}
```

Druga część programu obejmuje obliczenie czasu przejazdu dla zadanej przez użytkownika odległości. Mamy już uzupełnioną listę pojazdów, każdy z nich ma metodę `CzasPrzejazduZPredkosciaMaksymalna`, która wymaga informacji o przejechanej drodze, reszta danych jest już przez nas podana. Funkcja zwróci dla wybranego pojazdu wynik obliczeń, czyli czas. Zanim jednak wykonamy obliczenia po pierwsze powinniśmy zapytać o odległość:

```csharp
Console.Write("Podaj odległość do przejechania: ");
double odleglosc = double.Parse(Console.ReadLine());
```

Odległość jest jedna

### Ćwiczenie 6

Po pętli tworzącej liste pojazdów dodaj pobieranie od użytkownika odległości do przejechania dla pojazdów. Odległość powinna być tylko 1, będzie ona parametrem stałym dla każdego pojazdu - w ten sposób sprawdzimy czy samochód z najwiekszą prędkością maksymalną przejedzie najszybciej zadaną drogę.

## Obliczenia czasu przejazdu

Aktaulnie nasz program wygląda następująco:

```csharp
List<Pojazd> pojazdy = new List<Pojazd>();

for (int i = 0; i < 5; i++)
{
    Console.Write("Podaj Markę: ");
    string marka = Console.ReadLine();
    Console.Write("Podaj Model: ");
    string model = Console.ReadLine();
    Console.Write("Podaj V-max: ");
    double vmax = double.Parse(Console.ReadLine());
    Pojazd nowyPojazd = new Pojazd(marka, model, vmax);
    pojazdy.Add(nowyPojazd);
}

Console.Write("Podaj odległość do przejechania: ");
double odleglosc = double.Parse(Console.ReadLine());
```

Co aktualnie robi nasz program:

1. Definiuje liste Pojazdów
2. W pętli pytamy o dane potrzebne do stworzenia obiektu typu `Pojazd`, tworzymy go i dodajemy do listy pojazdów.
3. Pytamy o odległość, dla której porównamy czas przejazu wszystkich pojazdów, które dodaliśmy wcześniej do listy.

Pozostał tylko ostatni krok, czyli obliczanie czasu przejazdu dla poszczególnych pojazdów i wyświetlenie ich.

Jako, że mamy listę pojazdów powinniśmy dla każdego elementu tej listy wywołać jego funkcję. Aby to zrobić musimy przejść w pętli po wszystkich elementach list `pojazd`. Nie modyfikujemy naszej listy zatem możemy użyć pętli `foreach`:

```csharp
foreach(Pojazd pojazd in pojazdy)
{

}
```

Pętla `foreach` pomaga w przeglądaniu kolejnych elementów listy. Definicja pętli w nawiasie pojasiada definicje tymczasowej zmiennej reprezentującej pojedynczy obiekt w liście: `Pojazd pojazdy` następnie jest słówko kluczowe `in` a po nim następuje nazwa kolekcji (listy lub tablicy), którą chcemy przeglądać.

Zatem wewnątrz pętli mamy pojedynczy obiekt pojazd, który jest elementem naszej listy. Możemy wywołać jego metodę `CzasPrzejazduZPredkosciaMaksymalna`. Przed pętlą stworzyliśmy zmienną `double odleglosc`, która będzie przekazana jako parametr wspomnianej metody. Metoda zwraca czas przejazdu w fromie liczby typu double, więc musimy stworzyć zmienną, która przechowa nam wynik i posłuży do wyświetlenia tego wyniku, niech zmienna ma nazwę `czas`. `CzasPrzejazduZPredkosciaMaksymalna` zwraca liczbę typu double, za tem zmienna `czas` powinna mieć typ danych `double`. Zatem pierwsza linijka wewnątrz pętli powinna wyglądać następująco:

```csharp
double czas = pojazd.CzasPrzejazduZPredkosciaMaksymalna(odleglosc);
```

Jak widać w powyższym kodzie używamy zmienną `pojazd` jest to nasza zmienna tymczasowa z pętli, ona reprezentuje pojedynczy pojazd z naszej listy. Możemy również wyświetlić informacje o tym pojeździ i jego wynik dla zadanej drogi. W ten sposób na ekranie pojawią sie poszczególne pojazdy wraz z ich wynikami. Wyświetlanie danych może wyglądać następująco:

```csharp
Console.WriteLine("{0} {1} przejedzie drogę {2}km w czasie {3:0.00}h", pojazd.Marka, pojazd.Model, odleglosc, czas);
```

### Ćwiczenie 7

Pod kodem pobierajacym droge do przejazdu przez wszystkie pojazdy napisz pętlę, która dla każdego pojazdu wywoła jego metodę `CzasPrzejazduZPredkosciaMaksymalna`. Zapisz wynik czasu przejazdu do zmiennej: `czas`, a następnie wyświetl na ekranie ten wynik dla pojazdu.

## Gotowy program

Ćwiczenie 7 to ostatni etap tworzenia rozwiazania. Implementacja funkcji main powinna wyglądać następująco:

```csharp
List<Pojazd> pojazdy = new List<Pojazd>();

for (int i = 0; i < 5; i++)
{
    Console.Write("Podaj Markę: ");
    string marka = Console.ReadLine();
    Console.Write("Podaj Model: ");
    string model = Console.ReadLine();
    Console.Write("Podaj V-max: ");
    double vmax = double.Parse(Console.ReadLine());
    Pojazd nowyPojazd = new Pojazd(marka, model, vmax);
    pojazdy.Add(nowyPojazd);
}

Console.Write("Podaj odległość do przejechania: ");
double odleglosc = double.Parse(Console.ReadLine());
foreach(Pojazd pojazd in pojazdy)
{
    double czas = pojazd.CzasPrzejazduZPredkosciaMaksymalna(odleglosc);
    Console.WriteLine("{0} {1} przejedzie drogę {2}km w czasie {3:0.00}h", pojazd.Marka, pojazd.Model, odleglosc, czas);
}
```
