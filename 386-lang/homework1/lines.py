import fileinput

f = fileinput.input()
count = 0

for line in f:

	# Eliminate blank lines
    line = line.strip()

    # Eliminate commented lines
    if line and not line.startswith('#'):
        count += 1

print count