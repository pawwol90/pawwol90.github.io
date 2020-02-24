# Odliczanie czasu - wersja pro

Dodatkowo na zajęciach próbowaliśmy stworzyć wersje pro wyświetlającą duże cyfry w postaci graficznej (ascii art):

```csharp
public static void Main(string[] args)
{
	Console.WriteLine("Program do odliczania czasu.");
	int czasDoOdliczenia = IleCzasu();
	OdliczCzas(czasDoOdliczenia);
	Console.ReadKey(true);
}

static int IleCzasu()
{
	Console.Write("Ile sekund mam odliczyć?");
	return int.Parse(Console.ReadLine());
}

static void OdliczCzas(int sekundy)
{
	for(double i = 0; i < sekundy; i++)
	{
		Console.Clear();
		NarysujLiczbe(i.ToString());
		Thread.Sleep(1000);
	}
	Console.Clear();
	Console.Beep();
}

static void NarysujLiczbe(string liczba)
{
	for(int i = 0; i < liczba.Length; i++)
	{
		PokazCyfre(int.Parse(liczba[i].ToString()), i);
	}
}

static void PokazCyfre(int cyfra, int pozycja)
{
	int odleglosc = 6;
	switch(cyfra)
	{
		case 0:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write(" ### ");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write(" ### ");
			break;
		case 1:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("  # #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write(" #  #");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("    #");
			break;
		case 2:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("#    ");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("#####");
			break;
		case 3:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("  ###");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("#####");
			break;
		case 4:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#   #");             
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("#   #");             
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#####");             
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("    #");             
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("    #");
			break;
		case 5:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("#    ");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("#####");
			break;
		case 6:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("#    ");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("#####");
			break;
		case 7:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("    #");
			break;
		case 8:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("#####");
			break;
		case 9:
			Console.SetCursorPosition(pozycja * odleglosc, 0);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 1);
			Console.Write("#   #");
			Console.SetCursorPosition(pozycja * odleglosc, 2);
			Console.Write("#####");
			Console.SetCursorPosition(pozycja * odleglosc, 3);
			Console.Write("    #");
			Console.SetCursorPosition(pozycja * odleglosc, 4);
			Console.Write("#####");
			break;
	}
}
```