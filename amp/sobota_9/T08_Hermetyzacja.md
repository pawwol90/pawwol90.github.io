# Hermetyzacja - czego oczy nie widzą, tego sercu nie żal - public i private

Programowanie obiektowe obfituje w nazewnictwo, które nie zawsze jest łatwe do zaapamiętania. Odchodząc jednak od programowania, jeśli coś jest "hermetyczne" to znaczy, że jest szczelnie zamknięte. Hermetycznie zamknięty słoik pozwala nam na zobaczenie co w nim jest ale nie możemy tego w łatwy sposób np. spróbować. Często też w takim słoiku widzimy tylko to, co jest przy jego ściankach, ale nie do końc wiemy co jest w środku.

W programowaniu obiektowym sytuacja jest bardzo podobna, ponieważ hermetyzacja pozwala na ukrycie części zawartości naszej klasy przed jej użytkownikiem. Dodatkową możliwością jest częściowe ukrycie, ale nim zajmiemy się na kolejnych zajęciach.

W celu ukrycia lub wyjawienia pewnych szczegółów naszej klasy stosujemy odpowiednie modyfikatory przed definicją pól (zmiennych w klasach) czy metod (funkcji w klasach).

## Modyfikator Public

Najczęściej stosowany przez nas modyfikator we wcześniejszych tematach, który upublicznia to na co wskazuje, np. zapis w definicji pola `RozmiarButa` w klasie `Osoba`:

```csharp
public class Osoba {
    public int RozmiarButa;
}
```

powodował że pole `RozmiarButa` było dostępne dla wszystkich i można było np. stworzyć obiekt i uzyskać dostęp do tego pola:

```csharp
Osoba osoba = new Osoba();
osoba.RozmiarButa = 36;
```

Możemy zatem stworzyć prostą klasę: `Prostokat`, która pozwoli nam na wykonanie obliczeń dla prostokąta.

```csharp
public class Prostokat {

}
```

Każdy prostokąt posiada dwie właściwości: długość boku A i długość boku B. Zatem powinniśmy dodać dwa pola:

```csharp
public double A;
public double B;
```

Zwróć uwagę, że przed nazwą typu danch zastosowanego dla pól użyliśmy słówka `public`, które oznacza, że pola są publicznie dostępne.

**UWAGA**
Pomijamy konstruktor, poczas poprzednich zadań go dodawaliśmy tutaj pozostaje on pusty:

```csharp
public Prostokat() {

}
```

W klasie możemy dodać metodę:

```csharp
public void ObliczPole()
{

}
```

W wykonujemy stosowne obliczenia:

```csharp
double pole = A * B;
```

a następnie wyświetlamy na ekranie wynik

```csharp
Console.WriteLine("Pole prostokąta o bokach {0}x{1} to {2}", A, B, pole);
```

### Zadanie 1

Stwórz proejkt aplikacji konsolowej. Dodaj do projektu klase `Prostokąt` oraz dwa pola `A` i `B` reprezentujace długości boków prostokąta.

## Modyfikator Public - dostęp do pól klasy

Możemy teraz w naszym głównym programie użyć naszej klasy. Konstruktor klasy jest pusty, zatem:

```csharp
Prostokat prostokat1 = new Prostokat();
```

Zazwyczaj dane do pól klasy przekazywaliśmy przez konstruktor, ale możemy do nich uzyskać dostęp przez `.` po nazwie obiektu klasy, zatem możemy przypisać jakieś wartości do pól `A` i `B` naszej klasy prostokąt np w następujący sposób:

```csharp
Console.Write("Podaj wymiar A prostokąta: ");
prostokat1.A = double.Parse(Console.ReadLine());
Console.Write("Podaj wymiar B prostokąta: ");
prostokat1.B = double.Parse(Console.ReadLine());
```

Na koniec nie pozostało nam nic innego jak wykonać obliczenia:

```csharp
prostokat1.ObliczPole();
```

Wewnątrz metody `ObliczPole` jest wyświetlany wynik. Zauważ, że zarówno do pól `A` i `B` jak i do metody `ObliczPole` mieliśmy dostęp w momencie stworzenia obiektu tej klasy. Mogliśmy zmienić wartości dla `A` i `B` oraz wywołać wspomnianą wcześniej metodę. Było to możliwe dzięki zastosowaniu modyfikatora `public` przed nazwami tych elementów klasy.

### Zadanie 2

W pliku `Program.cs` w funkcji `Main` twórz pojedynczy obiekt klasy prostokąt, nastepnie pobierz dane i przypisz do pól `A` i `B` wartości odpowiednie i na koniec wywołaj metodę `ObliczPole`. Postepuj zgodnie z opisem powyżej.

## Modyfikator Private - trochę prywatności

Wyboraźmy sobie sytuację, że naszą klasę `Prostokat` tworzymy na rzecz biblioteki, która będzie wykorzystywana przez miliony programistów na świecie. Chcemy uchronić ją przed niszczycielskim działaniem nieświadomego programisty i ukryć przed nim kilka rzeczy.

Na pierwszy ogień chcemy, aby nie miał on dostępu do naszych pól klasy, musimy zatem zmodyfikować obecną ich definicję:

```csharp
public double A;
public double B;
```

Jeśli chcemy kompletnie zabronić dostępu do tych pól musimy modufikator `public` zamienić na `private`, zatem:

```csharp
private double A;
private double B;
```

Jeśli spróbujesz teraz uruchomić program okaże się, że wyrzuca on błedy:

![Zabroniony dostęp](Grafiki/screen01.png)

Dodając do pól klasy `private` zabroniliśmy dostepu do nich z zewnątrz - trochę tak jakbyśmy mocno dokręcili korek w naszym słoiku. Dobrze usuńmy zatem z pliku `Program.cs` nasz wadliwy kod:

```csharp
Console.Write("Podaj wymiar A prostokąta: ");
prostokat1.A = double.Parse(Console.ReadLine());
Console.Write("Podaj wymiar B prostokąta: ");
prostokat1.B = double.Parse(Console.ReadLine());
```

**POWYŻSZE LINIE NALEŻY USUNĄĆ!!!!!!!!!!**

Dobrze posprzątaliśmy, ale nie możemy już poprawnie policzyć pola prostokątu. Pola `A` i `B` nadal istnieją wewnątrz klasy, są one jednak prywatne, ale to nie broni nam modyfikować ich wartości z poziomu klasy. Możemy do klasy `Prostokat` dodać metodę `PobierzDane`:

```csharp
public void PobierzDane()
{

}
```

Jej implementacja będzie wyglądała bardzo podobnie do tego fragmentu, który usunęliśmy z funkcji `Main`:

```csharp
Console.Write("Podaj wymiar A prostokąta: ");
A = double.Parse(Console.ReadLine());
Console.Write("Podaj wymiar B prostokąta: ");
B = double.Parse(Console.ReadLine());
```

Pozostaje nam wrócić do pliku `Program.cs` i wywołać w miejscu usuniętego fragmentu naszą metodę:

```csharp
prostokat1.PobierzDane();
```

### Ćwiczenie 3

Zmień w polach `A` i `B` klasy `Prostokąt` modyfikatory dostępu z `public` na `private`. Usuń niedziałający kod z pliku `Program.cs` z funkcji `Main`, a następnie stwórz metodę `PobierzDane`, która zrealizuje to co było niemożliwe poza klasą w momencie zmiany dostepu do pól klasy. Na koniec w miejscu usuniętego fragmentu w funkcji `Main` wywołaj nową metodę `PobierzDane`

## Metody prywatne

Obecnie nasza klasa `Prostokat` wygląda następująco:

```csharp
public class Prostokat
{
    private double A;
    private double B;

    public Prostokat()
    {

    }

    public void PobierzDane()
    {
        Console.Write("Podaj wymiar A prostokąta: ");
        A = double.Parse(Console.ReadLine());
        Console.Write("Podaj wymiar B prostokąta: ");
        B = double.Parse(Console.ReadLine());
    }

    public void ObliczPole()
    {
        double pole = A * B;
        Console.WriteLine("Pole prostokąta o bokach {0}x{1} to {2}", A, B,pole);
    }
}
```

A funkcja `Main` ma poniższy kod:

```csharp
public static void Main(string[] args)
{
    Prostokat prostokat1 = new Prostokat();
    prostokat1.PobierzDane();
    prostokat1.ObliczPole();

    Console.ReadKey(true);
}
```

Ktoś jednak może w niepowołany sposób wywołać funckję `ObliczPole` dla obiektu typu `Prostokat` bez wcześniejszego wywołania `PobierzDane` - kolejny nieświadomy programista. My jednak możemy ukryć przed nim metodę `PobierzDane` i wywołać je wtedy kiedy ich potrzebujemy, czyli przed dokonaniem obliczenia pola prostokata.

Zmodyfikujmy zatem klasę `Prostokat` tak, aby zabronić dostęp do metody `PobierzDane`:

```csharp
private void PobierzDane()
```

Teraz ta metoda może być wywołana tylko i wyłącznie wewnątrz klasy `Prostokat`, a uruchomienie kodu w obecnym stanie skutkuje błedem:

![Zabroniony dostęp](Grafiki/screen02.png)

Chcemy, aby użytkownik został zapytany o wymniary prostokąta przed dokonaniem obliczeń jego pola zatem metodę: `ObliczPole`, która wygląda teraz następująco:

```csharp
public void ObliczPole()
{
    double pole = A * B;
    Console.WriteLine("Pole prostokąta o bokach {0}x{1} to {2}", A, B, pole);
}
```

powinniśmy zmodyfikować tak, aby wywoływana była w nim metoda `PobierzDane`:

```csharp
public void ObliczPole()
{
    PobierzDane();
    double pole = A * B;
    Console.WriteLine("Pole prostokąta o bokach {0}x{1} to {2}", A, B, pole);
}
```

Ostatnią rzeczą jaką powinniśmy zrobić jest usunięcie wadliwej linijki z pliku `Program.cs` z funkcji `Main`:

```csharp
prostokat1.PobierzDane(); //TO NALEŻY USUNĄĆ
```

### Zadanie 4

Zmodyfikuj definicję metody `PobierzDane`, tak aby była prywatna. Usuń jej wywołanie w pliku `Program.cs` a następnie dodaj jej odpowiednie wywołanie w metodzie `ObliczPole` w klasie `Prostokat`.

## Wnioski i dodatkowe zadanie

Zmodyfikowaliśmy klasę `Prostokąt` tak, że dostęp "z zewnątrz" jest tylko do metody `ObliczPole`, pozostałe elementy (oprócz konstruktora) są prywatne:

```csharp
public class Prostokat
{
    private double A;
    private double B;

    public Prostokat()
    {

    }

    private void PobierzDane()
    {
        Console.Write("Podaj wymiar A prostokąta: ");
        A = double.Parse(Console.ReadLine());
        Console.Write("Podaj wymiar B prostokąta: ");
        B = double.Parse(Console.ReadLine());
    }

    public void ObliczPole()
    {
        PobierzDane();
        double pole = A * B;
        Console.WriteLine("Pole prostokąta o bokach {0}x{1} to {2}", A, B, pole);
    }
}
```

Zakazaliśmy dostępu do tych pól ponieważ byla obawa że ktoś niepowołany wykorzysta naszą klasę i nieświadomie wykon jej metody. Obecnie użytkownik posiada jedynie jedną metodę, która pozwoli mu na obliczenie pola.

Ukrywanie pól i metod przy pomocy modyfikatora `private` stosuje się właśnie wtedy gdy nie chcemy udostępniać poza naszą klasę danych, które znajdują się w elementach oznaczonych tym modyfikatorem.

Niesie to jednak za sobą pewne skutki. Gdyby nasza klasa stała się elementem jakiejś biblioteki, która jest zamkniętym tworem, a ktoś kto skorzystał by z niej i chciał przy jej pomocy obliczyć obwód koła to natknąłby się na pewien problem: ma klasę `Prostokat`, a w obiektach tej klasy nie ma dostepu do danych podanych przy obliczaniu pola... W tym momencie osoba taka najpewniej zgłosi się do nas, twórców tej klasy, abyśmy stworzyli możliwość obliczania obwodu prostokąta.

Jako odpowiedzialni programiści nie chcemy dawać dostępu do tego co ustaliliśmy za prywatne, ale możemy dodać metodę publiczną, któa pozwoli nam na obliczenie obwodu. Musimy tu jednak pamiętać, że oprócz tego programisty, który się do nas zgłosił, może pojawić się wielu takich, którzy będą chcieli policzyć sam obwód prostokątu i wywołają tylko tą, nową metodę. Musimy pamiętać zatem, aby pobrać ponownie dane o prostokącie.

Dodajmy do klasy metodę `ObliczObwod`:

```csharp
public void ObliczObwod()
{
}
```

W metodzie najpierw poprośmy o dane, przez wywołanie metody "PobierzDane":

```csharp
PobierzDane();
```

a następnie dokonajmy obliczeń:

```csharp
double obwod = 2 * A + B;
```

I wyświetlmy wynik na konsoli:

```csharp
Console.WriteLine("Obwód prostokąta o bokach {0}x{1} to {2}", A, B, obwod);
```

I gotowe, nasz programista może teraz wykorzystać tą metodę, a my nie musimy się martwić, że ktoś inny coś zepsuje w naszej klasie. Wywołajmy ją zatem w pliku `Program.cs` w funkcji `Main`:

```csharp
prostokat1.ObliczObwod();
```

### Zadanie 5

Dodaj do programu metodę obliczającą obwód prostokąta według opisu powyżej. Na koniec wywołaj metodę `ObliczObwod` pod OBECNYM wywołaniem metody `ObliczPole` w funkcji `Main`.

## Wyślij efekty pracy

Rozwiązane zadania wyślij z uzyciem instrukcji, którą znajdziesz [tutaj](https://pawwol90.github.io/amp/ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej).

Adres email: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat: `Zajęcia zdalne - 30.05.2020 - Hermetyzacja`
