```csharp
Console.WriteLine("Zgadnij liczbę od 1 do 1000");
Random rnd = new Random();
int wylosowana = rnd.Next(1, 1001);
int liczbaUzytkownika = 0;
int proba = 0;
do {
	proba++;
	Console.Write("Próba {0}. Jaka to liczba? ", proba);
	liczbaUzytkownika = int.Parse(Console.ReadLine())		
	if (liczbaUzytkownika > wylosowana) 
	{
		Console.WriteLine("Za duża, próbuj dalej!");
	}
	if (liczbaUzytkownika < wylosowana) 
	{
		Console.WriteLine("Za mała, próbuj dalej!");
	}
} while(liczbaUzytkownika != wylosowana);
Console.WriteLine("Trafiona! Liczba prób {0}", proba);
Console.ReadKey(true);
```