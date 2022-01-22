<script>
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const shifts = [
        ["Shift 1", "Shift 2"],
        ["Shift 1"],
        ["Shift 1", "Shift 2", "Shift 3", "Shift 4", "Shift 5"],
        ["Shift 1", "Shift 2"],
        ["Shift 1", "Shift 2", "Shift 3"],
        ["Shift 1", "Shift 2"],
        ["Shift 1", "Shift 2"],
    ]
</script>

<div>
    <div class="container mx-auto">
        <div class="flex">
            {#each days as day, i}
                <div class="flex-col py-2 px-5">
                    <div class="font-semibold">{day}</div>
                    {#each shifts[i] as shift}
                        <div class="rounded-lg border-2 border-gray-700">{shift}</div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>
