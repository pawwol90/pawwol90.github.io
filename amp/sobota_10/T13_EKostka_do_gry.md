# Elektroniczna kostka do gry.

Na zajęciach utrwalaliśmy więdzę na temat pętli FOR

```csharp
public static void Main(string[] args)
{
	Console.WriteLine("Elektroniczna kostka do gry.");
	int liczbaRzutow = PobierzLiczbeRzutowKostka();
	RzucKostka(liczbaRzutow);
	Console.ReadKey(true);

static void RzucKostka(int liczbaRzutow)
{
	Random rnd = new Random(DateTime.Now.Millisecond);
	for(int i = 0; i<liczbaRzutow; i++)
	{
		int wylosowana = rnd.Next(1, 7);
		Console.WriteLine("Rzut {0}. wyrzucona liczba oczek to: {1}", i+1, wylosowana);
		string kostka = PokazKostke(wylosowana);
		Console.WriteLine(kostka);
	}

static int PobierzLiczbeRzutowKostka()
{
	Console.WriteLine("Ile razy chcesz rzucić kostką?");
	int ile = int.Parse(Console.Re			
	return ile;

static string PokazKostke(int liczba)
{
	string kostka = "";
	switch (liczba)
	{
		case 1:
			kostka = "+-----+";
			kostka += "\n|     |";
			kostka += "\n|  o  |";
			kostka += "\n|     |";
			kostka += "\n+-----+";
			break;
		case 2:
			kostka = "+-----+";
			kostka += "\n| o   |";
			kostka += "\n|     |";
			kostka += "\n|   o |";
			kostka += "\n+-----+";
			break;
		case 3:
			kostka = "+-----+";
			kostka += "\n| o   |";
			kostka += "\n|  o  |";
			kostka += "\n|   o |";
			kostka += "\n+-----+";
			break;
		case 4:
			kostka = "+-----+";
			kostka += "\n| o o |";
			kostka += "\n|     |";
			kostka += "\n| o o |";
			kostka += "\n+-----+";
			break;
		case 5:
			kostka = "+-----+";
			kostka += "\n| o o |";
			kostka += "\n|  o  |";
			kostka += "\n| o o |";
			kostka += "\n+-----+";
			break;
		case 6:    
			kostka = "+-----+";
			kostka += "\n| o o |";
			kostka += "\n| o o |";
			kostka += "\n| o o |";
			kostka += "\n+-----+";
			break;
		default:
			kostka = "Ta kosta nie obsługuje wybranej liczby oczek";
			break;
	}
	return kostka;
}
```