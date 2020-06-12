# Praktyczny przykład hermetyzacji

Nauczyliśmy się ostatnio bardzo wielu rzeczy, które są praktycznie podstawami codziennego działania programisty. Ze względu na to, że są to ostatnie wasze zajęcia z Akademii to dalsze rozszerzanie tej wiedzy zalży tylko od was, ale im bardziej zgłębicie tą wiedzę tym łatwiej będzie wam w przyszłości np. na studiach.

Zakres wiedzy z ostatnich tematów jest już czym co często uczone jest dopiero na studiach. Na tych zajęciach chciałbym, abyśmy ugruntowali wiedzę z ostatnich zajęć krótkim praktycznym przykładem.

## Aplikacja bankowa

Załóżmy sobie aplikację bankową, w której mamy listę kont bankowych oraz dwa rodzaje kont:

1. Oszczędnościowe:
   1. Imie właściciela
   2. Nazwisko właściciela
   3. Numer konta
   4. Saldo
   5. Kod pin - dostęp do konta
   6. Oprocentowanie
2. Zwykły rachunek:
   1. Imie właściciela
   2. Nazwisko właściciela
   3. Numer konta
   4. Saldo
   5. Kod pin - dostęp do konta

W aplikacji bankowej zakładamy możliwość:

1. Wpłaty pieniędzy na konto
2. Wypłaty pieniędzy z konta
3. Wyświetlenie salda konta

Jako pierwszy kork powinniśmy się zastanowić nad strukturą naszego programu:

1. Jak widać konto oszczędnościowe różni się jedynie oprocentowaniem od zwykłego rachunku. Jeśli dostrzegamy takie podobieństwa w dowolnym systemie możemy założyć, że powstaną dwie klasy: `Konto` - reprezentujące zwykły rachunek i `KontoOszczednosciowe` - w zasadzie mogłaby być kopią klasy `Konto`, ale znamy przecież mechanizm dziedziczenia i możemy odziedziczyć dane z klasy `Konto` i dodać brakujące informacje.
2. Klasy `Konto` i `KontoOszczednosciowe` powinny dodatkowo udostępniać metody do:
   1. Weryfikacji kodu pin
   2. Zapytania o saldo - powinna również dodatkowo weryfikować kod pin
   3. Wpłaty na konto - wpłata może odbyć się bez dodatkowej weryfikacji
   4. Wypłaty z konta - wypłata pieniędzy może odbyć się tylko po weryfikacji kodu pin
   5. Wyświetlenia danych do konta - po weryfikacji kodu pin do konta możemy wyświetlić je właścicielowi, aby mógł je sprawdzić i wysłać osobie, która będzie chciała mu wysłać przelew
3. W banku jest wiele kont zatem potrzebujemy czegoś co obsłuży nam wszystkie konta. Niech będzie to klasa `Bank`, która będzie posiadała listę kont zwykłych i oszczędnościowych - moglibyśmy tutaj zastosować dwie osobne listy, ale przecież wiemy na podstawie wiedzy z dziedziczenia, że możemy zastosować jedną listę - w tym wypadku listę przechowującą obiekty typu `Konto`, ponieważ to co jest zwykłym kontem może być też kontem oszczędnościowym.
4. Wypadałoby zadbać jeszcze o prywatność na kontach użytkowników:
   1. Imie i Nazwisko właściciela konta powinno być ukryte - chcemy chronić dane naszych klientów, wyświetlamy je tylko po wprowadzeniu kodu PIN
   2. Numer konta - to informacja publicznie dostępna - znając numer konta ale nie znając kodu pin możemy co najwyżej wysłać na to konto pieniądze
   3. Saldo - to ściśle tajna informacja powinna być prywatna i dostępna tylko po weryfikacji kodu PIN
   4. Kod pin - to kolejna ściśle tajna informacja, która może być użyta tylko w ramach klas związanych z kontem
   5. Oprocentowanie - to właściwość konta oszczędnościowego, powinno być prywatne ponieważ każdy z naszych klientów negocjuje własną stawkę oprocentowania zależną kwoty jaką posiada na koncie.

## Implementacja - klasa Konto

Zaczynamy od klasy `Konto` - dodajmy ją do projektu aplikacji która będzie bazą naszego programu. Tak jak powiedzieliśmy odkładamy do naszej klasy pola:

1. Imie - informacja poufna - od razu przychodzi na myśl `private`, ale jeśli będziemy wyświetlali dane konta oszczędnościowego to chcemy pokazać imie, zatem zamiast `private` dajemy `protected`:

   ```csharp
   protected string Imie;
   ```

2. Nazwisko - tak jak w przypadku imienia, przyda się w klasie KontoOszczednosciowe, zatem:

   ```csharp
   protected string Nazwisko;
   ```

3. Numer konta - to informacja publiczna, zatem od razu:

   ```csharp
   public string NumerKonta;
   ```

4. Saldo konta - to informacja, która jest taka sama w obu przypadkach kont i powinna nie być dostępna z zewnątrz, zatem:

   ```csharp
   private double Saldo;
   ```

5. Kod pin, przyda się w obu klasach, ale zrobimy sobie metodę, która będzie sprawdzała kod pin i w zasadzie to jedyne miejsce, w którym wykorzystamy to pole, zatem możemy zrobić je prywatne:

   ```csharp
   private int KodPin;
   ```

Mamy wszystkie pola dla konta, zatem stwórzmy konstruktor, który ustawi te dane:

```csharp
public Konto(string imie, string nazwisko, string numerKonta, double saldo, int kodPin)
{
    Imie = imie;
    Nazwisko = nazwisko;
    NumerKonta = numerKonta;
    Saldo = saldo;
    KodPin = kodPin;
}
```

Spora część funkcji konta jest ograniczona dostępem przed konieczność podania kodu PIN. Zatem jako pierwsza metodę zrobimy metodę do weryfikacji kodu PIN.

Metoda taka powinna być chroniona przed dostępem z zewnątrz ale reużywalna w klasach dziedziczących - np wyświetlanie danych konta będzie działało różnie w klasach reprezentujących konto, ale obie wymagają kodu PIN. Zatem metoda powinna być chroniona (`protected`). Tak jak w przypadku chronionego pola definiujemy weryfikację kodu pin:

```csharp
protected bool WeryfikujKodPin(int pin)
{
    if(pin == KodPin)
    {
        Console.WriteLine("Kod pin poprawny!");
        return true;
    }

    Console.WriteLine("Zły kod pin!");
    return false;
}
```

Pierwsza funkcja konta to wpłata pieniędzy na konto, wpłacić może dowolny użytkownik, ale nie może wpłacić ujemnej wartości ponieważ saldo konta się zmniejszy - bedziemy zmuszeni wypłacić takiemu użytkownikowi pieniądze, a to wbrew zasadom.

Funkcja wpłacania na konto wszędzie jest taka sama i publicznie dostępna zatem:

```csharp
public void Wplac(double kwota)
{
    if(kwota > 0)
    {
        Saldo += kwota;
    }
    else
    {
        Console.WriteLine("Nie można wpłacić ujemnej wartości");
    }
}
```

Wypłacanie pieniędzy powinno być bardzo podobne do wpłacania, z tym, że zamiast dodawać pieniądze do Salda to powinno je odejmować. Oczywiście nie możemy odjąć więcej niż mamy ani odjąć ujemnej wartości. Wypłacanie na każdym koncie działa tak samo, zatem metoda powinna być publiczna:

```csharp
public void Wyplac(double kwota, int pin)
{
    if(WeryfikujKodPin(pin))
    {
        if(kwota > 0)
        {
            if(Saldo > kwota)
            {
                Saldo -= kwota;
            }
            else
            {
                Console.WriteLine("Brak odpowiednich środków na koncie!");
            }
        }
        else
        {
            Console.WriteLine("Nie można wypłacić ujemnej wartości pieniędzy!");
        }
    }
}
```

Kolejna funckja konta to pokazywanie aktualnego salda, również jest ono identyczne dla obu kont i wymaga weryfikacji kodu pin:

```csharp
public void PokazSaldo(int pin)
{
    if(WeryfikujKodPin(pin))
    {
        Console.WriteLine("Twoje saldo: {0:c}", Saldo);
    }
}
```

Ostatnia metoda i funkcja naszego konta to pokazywanie danych naszego konta, będzie ono również zabezpieczone kodem pin, ale tutaj będzie drobna różnia między kontem zwykłym i oszczędnościowym. Musimy zatem zastosować metodę `wirtualną` tak abyśmy mogli zmienić jej działanie w przyszłej klasie reprezentującej konto oszczędnościowe:

```csharp
public virtual void PokazDaneKonta(int pin)
{
    if(WeryfikujKodPin(pin))
    {
        Console.WriteLine("Właścicielem konta jest: {0} {1}", Imie, Nazwisko);
        Console.WriteLine("Numer konta: {0}", NumerKonta);
    }
}
```

Powstała nam zatem całkiem spora klasa:

```csharp
public class Konto
{
    protected string Imie;
    protected string Nazwisko;
    public string NumerKonta;
    private double Saldo;
    private int KodPin;

    public Konto(string imie, string nazwisko, string numerKonta, double saldo, int kodPin)
    {
        Imie = imie;
        Nazwisko = nazwisko;
        NumerKonta = numerKonta;
        Saldo = saldo;
        KodPin = kodPin;
    }

    public void Wplac(double kwota)
    {
        if(kwota > 0)
        {
            Saldo += kwota;
        }
        else
        {
            Console.WriteLine("Nie można wpłacić ujemnej wartości");
        }
    }

    public void Wyplac(double kwota, int pin)
    {
        if(WeryfikujKodPin(pin))
        {
            if(kwota > 0)
            {
                if(Saldo > kwota)
                {
                    Saldo -= kwota;
                }
                else
                {
                    Console.WriteLine("Brak odpowiednich środków na koncie!");
                }
            }
            else
            {
                Console.WriteLine("Nie można wypłacić ujemnej wartości pieniędzy!");
            }
        }
    }

    public void PokazSaldo(int pin)
    {
        if(WeryfikujKodPin(pin))
        {
            Console.WriteLine("Twoje saldo: {0:c}", Saldo);
        }
    }

    public virtual void PokazDaneKonta(int pin)
    {
        if(WeryfikujKodPin(pin))
        {
            Console.WriteLine("Właścicielem konta jest: {0} {1}", Imie, Nazwisko);
            Console.WriteLine("Numer konta: {0}", NumerKonta);
        }
    }

    protected bool WeryfikujKodPin(int pin)
    {
        if(pin == KodPin)
        {
            Console.WriteLine("Kod pin poprawny!");
            return true;
        }

        Console.WriteLine("Zły kod pin!");
        return false;
    }
}
```

## Implementacja - klasa KontoOszczednosciowe

W przypadku konta oszczędnościowego, wiele załątwia nam już klasa `Konto`, musimy jedynie dołożyć informację o oprocentowaniu. Dodajmy zatem klasę `KontoOszczednosciowe` i do niego dziedziczenie z klasy `Konto`:

```csharp
public class KontoOszczednosciowe : Konto
{

}
```

Pierwsze i jedyne pole w klasie to `Oprocentowanie`, które jest informacją poufną zatem może być prywatne:

```csharp
private double Oprocentowanie;
```

Kolejnym krokiem jest stworzenie konstruktora, pamiętamy, że musi on obsłużyć również klasę Konto i zainicjalizować dodatkowe pole z oprocentowaniem:

```csharp
public KontoOszczednosciowe(string imie, string nazwisko, string numerKonta, double saldo, int kodPin, double oprocentowanie) : base(imie, nazwisko, numerKonta, saldo, kodPin)
{
    Oprocentowanie = oprocentowanie;
}
```

W trakcie implementacji konta wspomnieliśmy, że pokazywanie danych konta powinno pokazywać również oprocentowanie jeśli konto jest kontem oszczędnościowym, zatem powinniśmy nadpisać metodę `PokazDaneKonta` w następujący sposób:

```csharp
public override void PokazDaneKonta(int pin)
{
    if(WeryfikujKodPin(pin))
    {
        Console.WriteLine("Właścicielem konta jest: {0} {1}", Imie, Nazwisko);
        Console.WriteLine("Oprocentowanie: {0}", Oprocentowanie);
        Console.WriteLine("Numer konta: {0}", NumerKonta);
    }
}
```

Zauważ, że nie mamy implementacji `WeryfikujKodPin` w klasie `KontoOszczednosciowe`, ale mimo tego nie mamy błedu w tej linicje - dzieje się tak ponieważ klasa `KontoOszczednosciowe` wie że ma skorzystać tutaj z chronionej metody z klasy `Konto`.

To wszysko, nasza klasa `KontoOszczednosciowe` jest gotowa:

```csharp
public class KontoOszczednosciowe : Konto
{
    private double Oprocentowanie;

    public KontoOszczednosciowe(string imie, string nazwisko, string numerKonta, double saldo, int kodPin, double oprocentowanie) : base(imie, nazwisko, numerKonta, saldo, kodPin)
    {
        Oprocentowanie = oprocentowanie;
    }

    public override void PokazDaneKonta(int pin)
    {
        if(WeryfikujKodPin(pin))
        {
            Console.WriteLine("Właścicielem konta jest: {0} {1}", Imie, Nazwisko);
            Console.WriteLine("Oprocentowanie: {0}", Oprocentowanie);
            Console.WriteLine("Numer konta: {0}", NumerKonta);
        }
    }
}
```

## Implementacja - klasa Bank

Mamy już konto, teraz ktoś musi obsłużyć konta, a tym "kimś" jest nasz Bank. Stwórzmy klasę o nazwie `Bank`. Po dodaniu pliku z klasą dodajmy nagłówek:

```csharp
using System.Collections.Generic;
```

Powyższy nagłówek jest potrzebny do stworzenia pierwszego i jedynego pola w tej klasie - jest to lista kont w naszym banku. Będzie ona prywatna ponieważ nie chcemy, aby ktokolwiek spoza naszego banku miał dostęp do kont, któe w nim są:

```csharp
private List<Konto> Konta;
```

W klasie mamy pusty kontruktor wykorzystamy go do zainicjalizowania listy kont:

```csharp
public Bank()
{
    Konta = new List<Konto>();
    Konta.Add(new Konto("Jan", "Kowalski", "1", 1345.22, 1234));
    Konta.Add(new KontoOszczednosciowe("Adam", "Nowak", "2", 1000000.00, 0000, 1.23));
}
```

W konstruktorze tworzymy stałą list kont z danymi - normalnie w tym miejscu uzyskalibyśmy dostęp np do bazy danych i lista kont byłaby pobierana z bazy danych. Implementowanie tego typu rozwiązania na pewno nie zajęłoby nam 1 zajęć.

Bank będzie bradzo często pytał swoich użytkowników o numer konta, na którym chce wykonać operację, zatem zaimplementujmy sobie metodę prywatną, w której zapytamy o numer konta, a następnie w pętli znajdziemy konto pasujące do numeru:

```csharp
private Konto ZnajdzKonto()
{
    Console.Write("Podaj numer konta: ");
    string nrKonta = Console.ReadLine();
    foreach(Konto konto in Konta)
    {
        if(konto.NumerKonta == nrKonta)
        {
            return konto;
        }
    }
    Console.WriteLine("Nie znaleziono konta!");
    return null;
}
```

Równie często co o numer konta będziemy pytali o kod pin:

```csharp
private int ZapytajOPIN()
{
    Console.Write("Podaj kod PIN: ");
    int pin = int.Parse(Console.ReadLine());
    return pin;
}
```

Obie metody są prywatne ponieważ będziemy je wykorzystywać w kolejnych metodach.

Bank powinien dać możliwość:

1. Wpłacania
2. Wypłacania
3. Pokazywania salda
4. Pokazywania danych konta

Zatem stworzymy 4 powyżej wymienione metody publiczne. Do wpłacenia pieniędzy potrzebna jest tylko kwota, którą chcemy wpłacić oraz konto na któe chcemy wpłacić:

```csharp
public void Wplacanie()
{
    Konto wybrane = ZnajdzKonto();
    if(wybrane != null)
    {
        Console.Write("Podaj kwote do wpłaty: ");
        double kwota = double.Parse(Console.ReadLine());
        wybrane.Wplac(kwota);
    }
}
```

Aby wypłacić pieniążki z konta oprócz wymaganej kwoty i konta, z którego wypłacamy potrzebujemy również kod PIN do weryfikacji transakcji:

```csharp
public void Wyplacanie()
{
    Konto wybrane = ZnajdzKonto();
    if(wybrane != null)
    {
        int pin = ZapytajOPIN();
        Console.Write("Podaj kwote do wypłaty: ");
        double kwota = double.Parse(Console.ReadLine());
        wybrane.Wyplac(kwota, pin);
    }
}
```

Pokazywanie salda wymaga, oprócz znajomości numeru konta, również podania kodu pin, zatem:

```csharp
public void PokazywanieSalda()
{
    Konto wybrane = ZnajdzKonto();
    if(wybrane != null)
    {
        wybrane.PokazSaldo(ZapytajOPIN());
    }
}
```

Tak samo jak pokazywanie danych konta:

```csharp
public void PokazywanieDanychKonta()
{
    Konto wybrane = ZnajdzKonto();
    if(wybrane != null)
    {
        wybrane.PokazDaneKonta(ZapytajOPIN());
    }
}
```

W taki sposób powstała nam klasa bank:

```csharp
public class Bank
{
    private List<Konto> Konta;

    public Bank()
    {
        Konta = new List<Konto>();
        Konta.Add(new Konto("Jan", "Kowalski", "1", 1345.22, 1234));
        Konta.Add(new KontoOszczednosciowe("Adam", "Nowak", "2", 1000000.00, 0000, 1.23));
    }

    public void Wplacanie()
    {
        Konto wybrane = ZnajdzKonto();
        if(wybrane != null)
        {
            Console.Write("Podaj kwote do wpłaty: ");
            double kwota = double.Parse(Console.ReadLine());
            wybrane.Wplac(kwota);
        }
    }

    public void Wyplacanie()
    {
        Konto wybrane = ZnajdzKonto();
        if(wybrane != null)
        {
            int pin = ZapytajOPIN();
            Console.Write("Podaj kwote do wypłaty: ");
            double kwota = double.Parse(Console.ReadLine());
            wybrane.Wyplac(kwota, pin);
        }
    }

    public void PokazywanieSalda()
    {
        Konto wybrane = ZnajdzKonto();
        if(wybrane != null)
        {
            wybrane.PokazSaldo(ZapytajOPIN());
        }
    }

    public void PokazywanieDanychKonta()
    {
        Konto wybrane = ZnajdzKonto();
        if(wybrane != null)
        {
            wybrane.PokazDaneKonta(ZapytajOPIN());
        }
    }

    private int ZapytajOPIN()
    {
        Console.Write("Podaj kod PIN: ");
        int pin = int.Parse(Console.ReadLine());
        return pin;
    }

    private Konto ZnajdzKonto()
    {
        Console.Write("Podaj numer konta: ");
        string nrKonta = Console.ReadLine();
        foreach(Konto konto in Konta)
        {
            if(konto.NumerKonta == nrKonta)
            {
                return konto;
            }
        }
        Console.WriteLine("Nie znaleziono konta!");
        return null;
    }
}
```

## Implementacja - Głowny program

W głównym programie - w pliku `Program.cs` w funkcji `Main` możemy po prostu stworzyć obiekt Banku:

```csharp
Bank bank = new Bank();
```

Wyświetlić menu:

```csharp
Console.WriteLine("Co chcesz zrobić: ");
Console.WriteLine("1. Wpłacić na konto.");
Console.WriteLine("2. Wypłacić z konta.");
Console.WriteLine("3. Sprawdzić saldo konta.");
Console.WriteLine("4. Wyświetlić dane konta.");
```

Poprosić o wybór opcji w menu:

```csharp
Console.Write("Wybieram: ");
int wybor = int.Parse(Console.ReadLine());
```

I na koniec w zależności od doknanego przez użytkownika wyboru wywołać odpowiednią funkcję banku:

```csharp
switch(wybor)
{
    case 1:
        bank.Wplacanie();
        break;
    case 2:
        bank.Wyplacanie();
        break;
    case 3:
        bank.PokazywanieSalda();
        break;
    case 4:
        bank.PokazywanieDanychKonta();
        break;
    default:
        Console.WriteLine("Nieznana opcja");
        break;
}
```

Nie zapominamy o oczekiwaniu na klawisz na koncu:

```csharp
Console.ReadKey(true);
```

I w taki sposób powstanie nasza funkcja `Main`:

```csharp
public static void Main(string[] args)
{
    Bank bank = new Bank();
    Console.WriteLine("Co chcesz zrobić: ");
    Console.WriteLine("1. Wpłacić na konto.");
    Console.WriteLine("2. Wypłacić z konta.");
    Console.WriteLine("3. Sprawdzić saldo konta.");
    Console.WriteLine("4. Wyświetlić dane konta.");
    Console.Write("Wybieram: ");
    int wybor = int.Parse(Console.ReadLine());
    switch(wybor)
    {
        case 1:
            bank.Wplacanie();
            break;
        case 2:
            bank.Wyplacanie();
            break;
        case 3:
            bank.PokazywanieSalda();
            break;
        case 4:
            bank.PokazywanieDanychKonta();
            break;
        default:
            Console.WriteLine("Nieznana opcja");
            break;
    }
    Console.ReadKey(true);
}
```

## Wyślij efekty pracy

Rozwiązane zadania wyślij z uzyciem instrukcji, którą znajdziesz [tutaj](https://pawwol90.github.io/amp/ZdalneInstrukcja#wysyłanie-projektu-aplikacji-konsolowej).

Adres email: [pawel.woloszyn@akademiamlodychprogramistow.pl](mailto:pawel.woloszyn@akademiamlodychprogramistow.pl)

Temat: `Zajęcia zdalne - 14.06.2020 - Bank`

## [DZIĘKUJĘ ZA TEN ROK! :)](thanks)
